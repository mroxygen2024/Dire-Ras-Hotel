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
import { Building, MapPin, Award, Image as ImageIcon } from 'lucide-react';

const hotelInfoSchema = z.object({
  name: z.string().min(1, 'Hotel name is required').trim(),
  tagline: z.string().default(''),
  phone: z.string().min(5, 'Primary phone is required').trim(),
  phone2: z.string().default(''),
  email: z.string().email('Must be a valid contact email').trim(),
  address: z.string().min(1, 'Physical address is required').trim(),
  heroTitle: z.string().min(1, 'Hero header title is required').trim(),
  heroSubtitle: z.string().default(''),
  heroDescription: z.string().default(''),
  establishedText: z.string().default(''),
  logo: z.string().default(''),
  mapEmbedUrl: z.string().default(''),
  whatsappNumber: z.string().default(''),
  facebookUrl: z.string().default(''),
  instagramUrl: z.string().default(''),
  twitterUrl: z.string().default(''),
  tripAdvisorUrl: z.string().default(''),
});

export const HotelInfoCMS: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [logoUploading, setLogoUploading] = React.useState(false);

  // Fetch current hotel info from backend API
  const { data: hotelInfo, isLoading } = useQuery({
    queryKey: ['hotel-info'],
    queryFn: adminService.getHotelInfo,
  });

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(hotelInfoSchema),
  });

  const logoValue = watch('logo');

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
        mapEmbedUrl: hotelInfo.mapEmbedUrl || '',
        whatsappNumber: hotelInfo.whatsappNumber || '',
        facebookUrl: hotelInfo.facebookUrl || '',
        instagramUrl: hotelInfo.instagramUrl || '',
        twitterUrl: hotelInfo.twitterUrl || '',
        tripAdvisorUrl: hotelInfo.tripAdvisorUrl || '',
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

  const onSubmit = (data: any) => {
    updateMutation.mutate(data);
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file for the logo.');
      return;
    }

    setLogoUploading(true);
    try {
      const preview = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('Unable to read the selected image.'));
        reader.readAsDataURL(file);
      });

      setValue('logo', preview, { shouldDirty: true, shouldValidate: true });
      toast.success('Logo uploaded successfully. Save changes to publish it.');
    } catch {
      toast.error('Failed to process the selected logo image.');
    } finally {
      setLogoUploading(false);
      event.target.value = '';
    }
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
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 bg-white text-sm font-medium text-text-dark hover:bg-stone-50 cursor-pointer transition-colors">
                        <ImageIcon size={16} className="text-primary" />
                        <span>{logoUploading ? 'Uploading...' : 'Upload Logo'}</span>
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                      {(logoValue || hotelInfo?.logo) && (
                        <div className="h-12 flex items-center gap-3 px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl overflow-hidden max-w-sm">
                          <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-stone-400 shrink-0">Preview</span>
                          <img src={logoValue || hotelInfo?.logo} alt="Branding logo preview" className="h-8 object-contain" />
                        </div>
                      )}
                    </div>
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

                <Input
                  label="Secondary Telephone Number (Optional)"
                  error={errors.phone2?.message}
                  {...register('phone2')}
                />

                <Input
                  label="WhatsApp Number (international format)"
                  placeholder="251968094406"
                  error={errors.whatsappNumber?.message}
                  {...register('whatsappNumber')}
                />

                <Textarea
                  label="Physical Landmark Address"
                  error={errors.address?.message}
                  {...register('address')}
                />

                <Textarea
                  label="Google Maps Embed URL"
                  placeholder="https://maps.google.com/maps?...&output=embed"
                  error={errors.mapEmbedUrl?.message}
                  {...register('mapEmbedUrl')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Facebook URL"
                    error={errors.facebookUrl?.message}
                    {...register('facebookUrl')}
                  />
                  <Input
                    label="Instagram URL"
                    error={errors.instagramUrl?.message}
                    {...register('instagramUrl')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Twitter/X URL"
                    error={errors.twitterUrl?.message}
                    {...register('twitterUrl')}
                  />
                  <Input
                    label="TripAdvisor URL"
                    error={errors.tripAdvisorUrl?.message}
                    {...register('tripAdvisorUrl')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hero Context panel */}
          <div className="space-y-6">
            <Card className="border-stone-200/70 bg-linear-to-br from-white to-stone-50/20">
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
