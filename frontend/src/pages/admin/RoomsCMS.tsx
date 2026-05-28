import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, RoomData } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Users, 
  Bed, 
  Maximize2,
  DollarSign,
  AlertTriangle,
  X
} from 'lucide-react';

const roomFormSchema = z.object({
  name: z.string().min(1, 'Room name is required').trim(),
  price: z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() === '') return undefined;
    const num = Number(val);
    return isNaN(num) ? val : num;
  }, z.number().positive('Price must be a valid positive number')),
  currency: z.enum(['ETB', 'USD']).default('ETB'),
  image: z.string().min(1, 'Room image URL is required').trim(),
  description: z.string().min(1, 'Room description is required').trim(),
  size: z.string().optional().nullable().default(''),
  occupancy: z.preprocess((val) => Number(val), z.number().int().positive('Occupancy must be a positive integer')),
  bed: z.string().optional().nullable().default(''),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

export const RoomsCMS: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

  // Feature Input State
  const [featureInput, setFeatureInput] = useState('');

  // Fetch Rooms
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: adminService.getRooms,
  });

  // Forms
  const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd, watch: watchAdd, setValue: setValueAdd, formState: { errors: errorsAdd } } = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      currency: 'ETB',
      features: [],
      featured: false,
      occupancy: 2
    }
  });

  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, watch: watchEdit, setValue: setValueEdit, formState: { errors: errorsEdit } } = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
  });

  const addFeatures = watchAdd('features') || [];
  const editFeatures = watchEdit('features') || [];

  // Mutations
  const createMutation = useMutation({
    mutationFn: adminService.createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success('Room successfully added to catalog!');
      setIsAddOpen(false);
      resetAdd();
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to add room.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RoomData }) => adminService.updateRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success('Room configurations updated!');
      setIsEditOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update room.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success('Room has been removed.');
      setIsDeleteOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to delete room.');
    },
  });

  // Action Handlers
  const handleOpenEdit = (room: RoomData) => {
    setSelectedRoom(room);
    resetEdit({
      name: room.name,
      price: typeof room.price === 'string' ? Number(room.price) : room.price,
      currency: room.currency as any,
      image: room.image,
      description: room.description,
      size: room.size || '',
      occupancy: room.occupancy,
      bed: room.bed || '',
      features: Array.isArray(room.features) ? room.features : [],
      featured: room.featured,
    });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (room: RoomData) => {
    setSelectedRoom(room);
    setIsDeleteOpen(true);
  };

  const handleToggleFeatured = (room: RoomData) => {
    if (!room.id) return;
    updateMutation.mutate({
      id: room.id,
      data: {
        ...room,
        featured: !room.featured,
      },
    });
  };

  // Dynamic feature chip controls
  const handleAddFeature = (formType: 'add' | 'edit') => {
    if (!featureInput.trim()) return;
    if (formType === 'add') {
      setValueAdd('features', [...addFeatures, featureInput.trim()]);
    } else {
      setValueEdit('features', [...editFeatures, featureInput.trim()]);
    }
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number, formType: 'add' | 'edit') => {
    if (formType === 'add') {
      setValueAdd('features', addFeatures.filter((_, i) => i !== index));
    } else {
      setValueEdit('features', editFeatures.filter((_, i) => i !== index));
    }
  };

  // Search & Pagination Computations
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <Skeleton className="h-11 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-80 shadow-xs">
              <Skeleton className="h-44 w-full rounded-t-xl" />
              <CardContent className="p-5 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top action block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
            Rooms CMS Control
          </h1>
          <p className="text-sm text-muted-gray mt-1">
            Manage hotel rooms, luxury suites, price points, and active homepage spotlight featured status.
          </p>
        </div>
        <Button
          onClick={() => {
            resetAdd();
            setIsAddOpen(true);
          }}
          className="self-start sm:self-center flex items-center gap-2 px-5 cursor-pointer"
        >
          <Plus size={16} /> Add Room
        </Button>
      </div>

      {/* Filter and search utilities */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-3.5 text-stone-400" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page on filter
            }}
            placeholder="Search rooms by title, features, or size..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-250 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
          />
        </div>

        <div className="text-xs text-stone-500 font-semibold shrink-0">
          Showing {filteredRooms.length} of {rooms.length} registered rooms
        </div>
      </div>

      {/* Room Listing (Card Hybrid Layout) */}
      {paginatedRooms.length === 0 ? (
        <Card className="p-12 text-center border-stone-200/70">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Bed size={24} />
            </div>
            <h3 className="text-lg font-serif font-bold text-text-dark">No rooms matching filter</h3>
            <p className="text-sm text-muted-gray leading-normal">
              Adjust your search keywords or add a new room configuration to start publishing.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedRooms.map((room) => (
            <Card key={room.id} className="group overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Image block */}
                <div className="h-48 bg-stone-100 overflow-hidden relative">
                  <img
                    src={room.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  {/* Spotlight featured badge */}
                  {room.featured && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded shadow-md border border-primary/20 flex items-center gap-1">
                      <Sparkles size={10} fill="white" /> Spotlight
                    </span>
                  )}
                  {/* Availability tag */}
                  <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded shadow-md ${
                    room.isAvailable ? 'bg-emerald-600 text-white' : 'bg-stone-500 text-white'
                  }`}>
                    {room.isAvailable ? 'Available' : 'Booked'}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif font-bold text-lg text-text-dark leading-snug group-hover:text-primary transition-colors">
                      {room.name}
                    </h3>
                    <div className="shrink-0 flex flex-col items-end">
                      <span className="text-primary font-serif font-bold text-lg flex items-center">
                        <DollarSign size={14} className="mt-0.5 shrink-0" />
                        {typeof room.price === 'string' ? Number(room.price).toLocaleString() : room.price.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-muted-gray uppercase tracking-widest font-semibold">
                        Per Night ({room.currency})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-gray leading-relaxed font-medium line-clamp-3 mt-3">
                    {room.description}
                  </p>

                  {/* Attributes */}
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-stone-100 py-3.5 my-4 text-[11px] text-stone-500 font-semibold">
                    <div className="flex items-center gap-1.5 justify-center">
                      <Users size={13} className="text-stone-400 shrink-0" />
                      <span>Max {room.occupancy}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-center border-l border-r border-stone-100">
                      <Bed size={13} className="text-stone-400 shrink-0" />
                      <span className="truncate">{room.bed || 'King Size'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-center">
                      <Maximize2 size={13} className="text-stone-400 shrink-0" />
                      <span className="truncate">{room.size || '32 m²'}</span>
                    </div>
                  </div>

                  {/* Features Chips */}
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(room.features) && room.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="text-[10px] text-stone-500 bg-stone-100 font-semibold px-2 py-0.5 rounded">
                        {f}
                      </span>
                    ))}
                    {Array.isArray(room.features) && room.features.length > 3 && (
                      <span className="text-[10px] text-primary bg-red-50 font-bold px-2 py-0.5 rounded">
                        +{room.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-6 py-4 bg-stone-50/50 border-t border-stone-100 flex items-center justify-between">
                <Button
                  onClick={() => handleToggleFeatured(room)}
                  variant="ghost"
                  className={`text-[10px] px-3 py-1.5 border uppercase tracking-wider font-bold ${
                    room.featured ? 'border-amber-200 bg-amber-50 text-gold-dark' : 'border-stone-250 text-stone-500'
                  } cursor-pointer`}
                >
                  {room.featured ? 'Featured' : 'Spotlight'}
                </Button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(room)}
                    className="p-2 text-stone-500 hover:bg-stone-100 hover:text-text-dark rounded transition-colors cursor-pointer"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(room)}
                    className="p-2 text-red-650 hover:bg-red-50 hover:text-red-750 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-stone-200">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="cursor-pointer"
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              variant={currentPage === i + 1 ? 'primary' : 'outline'}
              size="sm"
              className="w-9 h-9 p-0 flex items-center justify-center text-xs font-semibold cursor-pointer"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="cursor-pointer"
          >
            Next
          </Button>
        </div>
      )}

      {/* ==========================================
          MODAL 1: ADD ROOM
         ========================================== */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Room" size="lg">
        <form onSubmit={handleSubmitAdd((data) => createMutation.mutate(data))} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Room / Suite Name" error={errorsAdd.name?.message} {...registerAdd('name')} />
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input label="Price per Night" type="text" error={errorsAdd.price?.message} {...registerAdd('price')} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-1.5 block">Currency</label>
                <select {...registerAdd('currency')} className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-text-dark focus:outline-none focus:border-primary">
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>

          <Input label="Image URL" placeholder="https://images.unsplash.com/..." error={errorsAdd.image?.message} {...registerAdd('image')} />

          <Textarea label="Short Room Description" error={errorsAdd.description?.message} {...registerAdd('description')} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Room Size (e.g. 35 m²)" error={errorsAdd.size?.message} {...registerAdd('size')} />
            <Input label="Max Occupancy" type="number" error={errorsAdd.occupancy?.message} {...registerAdd('occupancy')} />
            <Input label="Bed Type (e.g. 1 King Bed)" error={errorsAdd.bed?.message} {...registerAdd('bed')} />
          </div>

          {/* Features Dynamic Chip Field */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-1.5 block">Room Features / Amenities</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g. Free WiFi, Mini Bar, Balcony"
                className="flex-1 px-3.5 py-2 bg-white border border-stone-200 rounded-lg text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature('add');
                  }
                }}
              />
              <Button type="button" onClick={() => handleAddFeature('add')} variant="outline" size="sm" className="px-3.5 cursor-pointer">Add</Button>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-6">
              {addFeatures.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs text-primary bg-red-50 font-semibold px-2.5 py-1 rounded-md border border-primary/10">
                  {f}
                  <button type="button" onClick={() => handleRemoveFeature(i, 'add')} className="text-stone-400 hover:text-primary cursor-pointer"><X size={12} /></button>
                </span>
              ))}
              {addFeatures.length === 0 && <span className="text-xs italic text-stone-400">No custom amenities added.</span>}
            </div>
          </div>

          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" id="add-featured" {...registerAdd('featured')} className="h-4 w-4 rounded border-stone-300 text-primary focus:ring-primary" />
            <label htmlFor="add-featured" className="text-xs font-bold text-text-dark uppercase tracking-wide cursor-pointer">Spotlight Featured Suite</label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button type="submit" loading={createMutation.isPending} className="cursor-pointer">Add Room</Button>
          </div>
        </form>
      </Modal>

      {/* ==========================================
          MODAL 2: EDIT ROOM
         ========================================== */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Room Configuration" size="lg">
        <form onSubmit={handleSubmitEdit((data) => {
          if (!selectedRoom?.id) return;
          updateMutation.mutate({ id: selectedRoom.id, data });
        })} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Room / Suite Name" error={errorsEdit.name?.message} {...registerEdit('name')} />
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input label="Price per Night" type="text" error={errorsEdit.price?.message} {...registerEdit('price')} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-1.5 block">Currency</label>
                <select {...registerEdit('currency')} className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-text-dark focus:outline-none focus:border-primary">
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>

          <Input label="Image URL" placeholder="https://images.unsplash.com/..." error={errorsEdit.image?.message} {...registerEdit('image')} />

          <Textarea label="Short Room Description" error={errorsEdit.description?.message} {...registerEdit('description')} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Room Size (e.g. 35 m²)" error={errorsEdit.size?.message} {...registerEdit('size')} />
            <Input label="Max Occupancy" type="number" error={errorsEdit.occupancy?.message} {...registerEdit('occupancy')} />
            <Input label="Bed Type (e.g. 1 King Bed)" error={errorsEdit.bed?.message} {...registerEdit('bed')} />
          </div>

          {/* Features Dynamic Chip Field */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-1.5 block">Room Features / Amenities</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g. Free WiFi, Mini Bar, Balcony"
                className="flex-1 px-3.5 py-2 bg-white border border-stone-200 rounded-lg text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature('edit');
                  }
                }}
              />
              <Button type="button" onClick={() => handleAddFeature('edit')} variant="outline" size="sm" className="px-3.5 cursor-pointer">Add</Button>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-6">
              {editFeatures.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs text-primary bg-red-50 font-semibold px-2.5 py-1 rounded-md border border-primary/10">
                  {f}
                  <button type="button" onClick={() => handleRemoveFeature(i, 'edit')} className="text-stone-400 hover:text-primary cursor-pointer"><X size={12} /></button>
                </span>
              ))}
              {editFeatures.length === 0 && <span className="text-xs italic text-stone-400">No custom amenities added.</span>}
            </div>
          </div>

          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" id="edit-featured" {...registerEdit('featured')} className="h-4 w-4 rounded border-stone-300 text-primary focus:ring-primary" />
            <label htmlFor="edit-featured" className="text-xs font-bold text-text-dark uppercase tracking-wide cursor-pointer">Spotlight Featured Suite</label>
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
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Confirm Room Deletion" size="sm">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-text-dark">Remove {selectedRoom?.name}?</h3>
            <p className="text-xs text-muted-gray mt-2 leading-relaxed font-medium">
              Are you sure you want to permanently delete this room? This action is irreversible and will remove all booking correlations.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={() => setIsDeleteOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button
              type="button"
              variant="danger"
              loading={deleteMutation.isPending}
              onClick={() => selectedRoom?.id && deleteMutation.mutate(selectedRoom.id)}
              className="cursor-pointer"
            >
              Permanently Remove
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
