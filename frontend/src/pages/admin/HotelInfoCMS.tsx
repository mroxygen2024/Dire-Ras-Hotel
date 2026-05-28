import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { Building, Phone, Mail, MapPin, Award, Image as ImageIcon } from 'lucide-react';

const hotelInfoSchema = z.object({
  name: z.string().min(1, 'Hotel name is required').trim(),
  tagline: z.string().optional().nullable().default(''),
  phone: z.string().min(5, 'Primary phone is required').trim(),
  phone2: z.string().optional().nullable().default(''),
  email: z.string().email('Must be a valid contact email').trim(),
  address: z.string().min(1, 'Physical address is required').trim(),
  heroTitle: z.string().min(1, 'Hero header title is required').trim(),
  heroSubtitle: z.string().optional().nullable().default(''),
  heroDescription: z.string().optional().nullable().default(''),
  establishedText: z.string().optional().nullable().default(''),
  logo: z.string().optional().nullable().default(''),
});

type HotelInfoFormValues = z.infer<typeof hotelInfoSchema>;

export const HotelInfoCMS: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Fetch current hotel info from backend API
  const { data: hotelInfo, isLoading } = useQuery({
    queryKey: ['hotel-info'],
    queryFn: adminService.getHotelInfo,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HotelInfoFormValues>({
    resolver: zodResolver(hotelInfoSchema),
  });

  // Reset form when info loaded
  React.useEffect(() => {
    if (hotelInfo) {
      reset({
        name: hotelInfo.name || '',
        tagline: hotelInfo.tagline || '',
        phone: hotelInfo.phone || '',
        phone2: hotelInfo.phone2 || '',
        email: hotelInfo.email || '',
        address: hotelInfo.address || '',
        heroTitle: hotelInfo.heroTitle || '',
        heroSubtitle: hotelInfo.heroSubtitle || '',
        heroDescription: hotelInfo.heroDescription || '',
        establishedText: hotelInfo.establishedText || '',
        logo: hotelInfo.logo || '',
      });
    }
  }, [hotelInfo, reset]);

  // Mutation to save updates in Express
  const updateMutation = useMutation({
    mutationFn: adminService.updateHotelInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotel-info'] });
      toast.success('Hotel configuration transactionally updated!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update hotel info.');
    },
  });

  const onSubmit = (data: HotelInfoFormValues) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-11 w-32 ml-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
          Hotel Info & Branding
        </h1>
        <p className="text-sm text-muted-gray mt-1">
          Configure branding, global contact details, and initial landing page hero headings.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="text-primary" size={18} />
                  Site Identity & Branding
                </CardTitle>
                <CardDescription>Hotel naming, slogans, and digital brand imagery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Official Hotel Name"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Established Slogan Text"
                    placeholder="Established in 1947"
                    error={errors.establishedText?.message}
                    {...register('establishedText')}
                  />
                </div>

                <Input
                  label="Hotel Tagline / Slogan"
                  placeholder="The Heritage Sensation of Dire Dawa"
                  error={errors.tagline?.message}
                  {...register('tagline')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                  <Input
                    label="Logo URL"
                    placeholder="https://example.com/logo.png"
                    error={errors.logo?.message}
                    {...register('logo')}
                  />
                  {hotelInfo?.logo && (
                    <div className="h-10.5 flex items-center gap-3 px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg overflow-hidden max-w-xs">
                      <ImageIcon size={16} className="text-stone-400 shrink-0" />
                      <span className="text-xs font-semibold text-muted-gray truncate shrink-0">Logo active:</span>
                      <img src={hotelInfo.logo} alt="Branding logo preview" className="h-6 object-contain" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary" size={18} />
                  Hotel Contact Coordinates
                </CardTitle>
                <CardDescription>Configure physical location addresses and communication channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Contact Email Address"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <Input
                    label="Primary Telephone Number"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Secondary Telephone Number (Optional)"
                    error={errors.phone2?.message}
                    {...register('phone2')}
                  />
                  <Input
                    label="Official WhatsApp Link Number"
                    placeholder="+251..."
                    error={errors.whatsappNumber?.message}
                    {...register('whatsappNumber')}
                  />
                </div>

                <Textarea
                  label="Physical Landmark Address"
                  error={errors.address?.message}
                  {...register('address')}
                />
              </CardContent>
            </Card>
          </div>

          {/* Hero Context panel */}
          <div className="space-y-6">
            <Card className="border-stone-200/70 bg-gradient-to-br from-white to-stone-50/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="text-primary" size={18} />
                  Hero Landing Context
                </CardTitle>
                <CardDescription>Default headers shown on top of the landing page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input
                  label="Hero Core Title"
                  error={errors.heroTitle?.message}
                  {...register('heroTitle')}
                />

                <Input
                  label="Hero Subtitle"
                  error={errors.heroSubtitle?.message}
                  {...register('heroSubtitle')}
                />

                <Textarea
                  label="Hero Short Description"
                  error={errors.heroDescription?.message}
                  {...register('heroDescription')}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                loading={updateMutation.isPending}
                className="w-full text-sm font-semibold tracking-wide py-3 cursor-pointer"
              >
                Save All Changes
              </Button>
              <p className="text-[11px] text-center text-muted-gray leading-normal">
                Updating these parameters will instantly refresh metadata configurations across all landing page footer segments and booking cards.
              </p>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
