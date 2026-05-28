import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, HotelServiceData } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Wifi, 
  Utensils, 
  Coffee, 
  GlassWater, 
  Car, 
  Shield, 
  Sparkles,
  Tv,
  Accessibility,
  Flame,
  AlertTriangle
} from 'lucide-react';

const serviceFormSchema = z.object({
  title: z.string().min(1, 'Service title is required').trim(),
  description: z.string().min(1, 'Service description is required').trim(),
  icon: z.string().optional().nullable().default('Wifi'),
  order: z.preprocess((val) => Number(val), z.number().int().default(0)),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

// Map of pickable Lucide icons with their components
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Wifi: Wifi,
  Utensils: Utensils,
  Coffee: Coffee,
  GlassWater: GlassWater,
  Car: Car,
  Shield: Shield,
  Sparkles: Sparkles,
  Tv: Tv,
  Accessibility: Accessibility,
  Flame: Flame,
};

export const ServicesCMS: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Modal & Edit State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<HotelServiceData | null>(null);
  
  // Icon Selector State
  const [selectedIcon, setSelectedIcon] = useState('Wifi');

  // Fetch services
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: adminService.getServices,
    select: (data) => [...data].sort((a, b) => a.order - b.order), // Sort by order
  });

  const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd, setValue: setValueAdd, formState: { errors: errorsAdd } } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      icon: 'Wifi',
      order: 0,
    }
  });

  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue: setValueEdit, formState: { errors: errorsEdit } } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: adminService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service successfully added!');
      setIsAddOpen(false);
      resetAdd();
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to add service.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: HotelServiceData }) => adminService.updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service details updated!');
      setIsEditOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update service.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service has been removed.');
      setIsDeleteOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to delete service.');
    },
  });

  // Reorder Mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ index, direction }: { index: number; direction: 'up' | 'down' }) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= services.length) return;

      const current = services[index];
      const target = services[targetIndex];

      if (!current.id || !target.id) return;

      // Swap orders
      await Promise.all([
        adminService.updateService(current.id, { ...current, order: target.order }),
        adminService.updateService(target.id, { ...target, order: current.order })
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Display hierarchy reordered successfully!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to reorder services.');
    },
  });

  const handleOpenEdit = (service: HotelServiceData) => {
    setSelectedService(service);
    setSelectedIcon(service.icon || 'Wifi');
    resetEdit({
      title: service.title,
      description: service.description,
      icon: service.icon || 'Wifi',
      order: service.order,
    });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (service: HotelServiceData) => {
    setSelectedService(service);
    setIsDeleteOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-11 w-32" />
        </div>
        <Card>
          <CardContent className="p-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-72" />
                  </div>
                </div>
                <Skeleton className="h-10 w-24" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
            Hotel Services CMS
          </h1>
          <p className="text-sm text-muted-gray mt-1">
            Publish, edit, and arrange services and luxury amenities displayed on the landing page catalog.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedIcon('Wifi');
            resetAdd({ icon: 'Wifi', order: services.length });
            setIsAddOpen(true);
          }}
          className="self-start sm:self-center flex items-center gap-2 px-5 cursor-pointer"
        >
          <Plus size={16} /> Add Service
        </Button>
      </div>

      {/* Services Table/List */}
      <Card className="border border-stone-200/60 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          {services.length === 0 ? (
            <div className="p-12 text-center text-stone-400 text-sm font-medium">
              No services added yet. Click "Add Service" to populate your catalog.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-muted-gray">
                    <th className="px-6 py-4 w-16 text-center">Order</th>
                    <th className="px-6 py-4 w-24">Icon</th>
                    <th className="px-6 py-4">Title & Details</th>
                    <th className="px-6 py-4 w-24 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {services.map((service, index) => {
                    const IconComponent = ICON_MAP[service.icon || 'Wifi'] || Wifi;
                    return (
                      <tr key={service.id} className="hover:bg-stone-55/20 transition-colors">
                        {/* Order Arranger Column */}
                        <td className="px-6 py-4 text-center font-medium">
                          <div className="flex flex-col items-center gap-1">
                            <button
                              type="button"
                              onClick={() => reorderMutation.mutate({ index, direction: 'up' })}
                              disabled={index === 0}
                              className="p-1 hover:bg-stone-100 text-stone-400 hover:text-primary disabled:opacity-30 rounded cursor-pointer"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <span className="text-[11px] font-bold text-text-dark bg-stone-100 px-2 py-0.5 rounded">
                              {service.order}
                            </span>
                            <button
                              type="button"
                              onClick={() => reorderMutation.mutate({ index, direction: 'down' })}
                              disabled={index === services.length - 1}
                              className="p-1 hover:bg-stone-100 text-stone-400 hover:text-primary disabled:opacity-30 rounded cursor-pointer"
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </td>

                        {/* Icon Column */}
                        <td className="px-6 py-4">
                          <div className="w-11 h-11 bg-red-50 text-primary rounded-xl flex items-center justify-center border border-primary/10">
                            <IconComponent size={20} />
                          </div>
                        </td>

                        {/* Title & Details Column */}
                        <td className="px-6 py-4 max-w-md">
                          <h4 className="font-bold text-text-dark text-base">{service.title}</h4>
                          <p className="text-xs text-muted-gray mt-1 leading-relaxed font-medium line-clamp-2">
                            {service.description}
                          </p>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(service)}
                              className="p-2 text-stone-500 hover:bg-stone-100 hover:text-text-dark rounded transition-colors cursor-pointer"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleOpenDelete(service)}
                              className="p-2 text-red-650 hover:bg-red-50 hover:text-red-750 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ==========================================
          MODAL 1: ADD SERVICE
         ========================================== */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Service">
        <form onSubmit={handleSubmitAdd((data) => createMutation.mutate({ ...data, icon: selectedIcon }))} className="space-y-5">
          <Input label="Service Title" error={errorsAdd.title?.message} {...registerAdd('title')} />
          
          <Textarea label="Service Description" error={errorsAdd.description?.message} {...registerAdd('description')} />

          {/* Graphical Icon Selector */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-2 block">Select Service Icon</label>
            <div className="grid grid-cols-5 gap-3 p-4 bg-stone-50 border border-stone-200 rounded-xl">
              {Object.keys(ICON_MAP).map((iconName) => {
                const IconComp = ICON_MAP[iconName];
                const isSelected = selectedIcon === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    className={`p-3.5 rounded-lg flex flex-col items-center justify-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary border-primary text-white scale-105 shadow-md shadow-red-900/10'
                        : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-text-dark'
                    }`}
                  >
                    <IconComp size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button type="submit" loading={createMutation.isPending} className="cursor-pointer">Add Service</Button>
          </div>
        </form>
      </Modal>

      {/* ==========================================
          MODAL 2: EDIT SERVICE
         ========================================== */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Service Details">
        <form onSubmit={handleSubmitEdit((data) => {
          if (!selectedService?.id) return;
          updateMutation.mutate({ id: selectedService.id, data: { ...data, icon: selectedIcon } });
        })} className="space-y-5">
          <Input label="Service Title" error={errorsEdit.title?.message} {...registerEdit('title')} />
          
          <Textarea label="Service Description" error={errorsEdit.description?.message} {...registerEdit('description')} />

          {/* Graphical Icon Selector */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-2 block">Select Service Icon</label>
            <div className="grid grid-cols-5 gap-3 p-4 bg-stone-50 border border-stone-200 rounded-xl">
              {Object.keys(ICON_MAP).map((iconName) => {
                const IconComp = ICON_MAP[iconName];
                const isSelected = selectedIcon === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    className={`p-3.5 rounded-lg flex flex-col items-center justify-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary border-primary text-white scale-105 shadow-md shadow-red-900/10'
                        : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-text-dark'
                    }`}
                  >
                    <IconComp size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button type="submit" loading={updateMutation.isPending} className="cursor-pointer">Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* ==========================================
          MODAL 3: DELETE CONFIRMATION
         ========================================== */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Remove Service Catalog Item" size="sm">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-650 mx-auto">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-text-dark">Delete {selectedService?.title}?</h3>
            <p className="text-xs text-muted-gray mt-2 leading-relaxed font-medium">
              Are you sure you want to remove this service from your public catalog?
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={() => setIsDeleteOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button
              type="button"
              variant="danger"
              loading={deleteMutation.isPending}
              onClick={() => selectedService?.id && deleteMutation.mutate(selectedService.id)}
              className="cursor-pointer"
            >
              Confirm Deletion
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
