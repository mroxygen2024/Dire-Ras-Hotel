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
import { ImageIcon, Monitor, Sparkles, Play, Calendar } from 'lucide-react';

const heroSchema = z.object({
  badgeText: z.string().optional().nullable().default(''),
  subtitle: z.string().optional().nullable().default(''),
  titlePart1: z.string().min(1, 'Title Part 1 is required').trim(),
  titlePart2: z.string().optional().nullable().default(''),
  tagline: z.string().optional().nullable().default(''),
  ctaBookText: z.string().optional().nullable().default(''),
  ctaVideoText: z.string().optional().nullable().default(''),
  videoUrl: z.string().optional().nullable().default(''),
  backgroundImage: z.string().min(1, 'Background image URL is required').trim(),
});

type HeroFormValues = z.infer<typeof heroSchema>;

export const HeroCMS: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Fetch current Hero data
  const { data: heroData, isLoading } = useQuery({
    queryKey: ['hero-section'],
    queryFn: adminService.getHeroSection,
  });

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
  });

  // Prefill form when data is loaded
  React.useEffect(() => {
    if (heroData) {
      reset({
        badgeText: heroData.badgeText || '',
        subtitle: heroData.subtitle || '',
        titlePart1: heroData.titlePart1 || '',
        titlePart2: heroData.titlePart2 || '',
        tagline: heroData.tagline || '',
        ctaBookText: heroData.ctaBookText || '',
        ctaVideoText: heroData.ctaVideoText || '',
        videoUrl: heroData.videoUrl || '',
        backgroundImage: heroData.backgroundImage || '',
      });
    }
  }, [heroData, reset]);

  // Watch form fields for the live preview!
  const watchBadge = watch('badgeText');
  const watchSubtitle = watch('subtitle');
  const watchTitle1 = watch('titlePart1');
  const watchTitle2 = watch('titlePart2');
  const watchTagline = watch('tagline');
  const watchCtaBook = watch('ctaBookText');
  const watchCtaVideo = watch('ctaVideoText');
  const watchBgImage = watch('backgroundImage');

  // Mutation to save updates in Express API
  const updateMutation = useMutation({
    mutationFn: adminService.updateHeroSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-section'] });
      toast.success('Hero Section parameters updated successfully!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update Hero Section.');
    },
  });

  const onSubmit = (data: HeroFormValues) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8 space-y-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Skeleton className="h-[450px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
          Hero Section CMS
        </h1>
        <p className="text-sm text-muted-gray mt-1">
          Customize the prominent main landing page area, background aesthetics, and video actions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Block (Left 5 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-primary" size={18} />
                  Hero Headers & Badges
                </CardTitle>
                <CardDescription>Configure headers and luxury accent details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Accent Badge Text"
                    placeholder="GUEST STORIES or WELCOME"
                    error={errors.badgeText?.message}
                    {...register('badgeText')}
                  />
                  <Input
                    label="Accent Subtitle Text"
                    placeholder="Experiencing timelines of prestige"
                    error={errors.subtitle?.message}
                    {...register('subtitle')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Core Header Title (Part 1)"
                    placeholder="Welcome to the Royal Palace"
                    error={errors.titlePart1?.message}
                    {...register('titlePart1')}
                  />
                  <Input
                    label="Core Header Title (Part 2)"
                    placeholder="of Exceptional Hospitality"
                    error={errors.titlePart2?.message}
                    {...register('titlePart2')}
                  />
                </div>

                <Textarea
                  label="Hero Description / Tagline"
                  placeholder="Dire Dawa Ras Hotel stands as an iconic landmark of hospitality..."
                  error={errors.tagline?.message}
                  {...register('tagline')}
                />
              </CardContent>
            </Card>

            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="text-primary" size={18} />
                  Media & Call-To-Actions
                </CardTitle>
                <CardDescription>Update hero background images and booking controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input
                  label="Hero Background Image URL"
                  placeholder="https://images.unsplash.com/..."
                  error={errors.backgroundImage?.message}
                  {...register('backgroundImage')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="CTA Book Button Text"
                    placeholder="Book Your Royal Stay"
                    error={errors.ctaBookText?.message}
                    {...register('ctaBookText')}
                  />
                  <Input
                    label="CTA Video Button Text"
                    placeholder="Watch Brand Video"
                    error={errors.ctaVideoText?.message}
                    {...register('ctaVideoText')}
                  />
                </div>

                <Input
                  label="CTA Youtube/Vimeo Video URL (Optional)"
                  placeholder="https://www.youtube.com/watch?v=..."
                  error={errors.videoUrl?.message}
                  {...register('videoUrl')}
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              loading={updateMutation.isPending}
              className="w-full py-3.5 text-sm font-semibold tracking-wide cursor-pointer"
            >
              Publish Hero Updates
            </Button>
          </div>

          {/* Live Preview Block (Right 7 Cols) */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-bold text-muted-gray flex items-center gap-2">
                <Monitor size={14} className="text-primary" />
                Live Desktop & Mobile Preview
              </h3>
              <span className="text-[10px] uppercase font-bold bg-amber-50 text-gold-dark border border-amber-100 px-2 py-0.5 rounded">
                Dynamic Sync
              </span>
            </div>

            {/* Simulated Public Hero Window */}
            <div className="w-full border border-stone-300 rounded-xl overflow-hidden shadow-2xl relative bg-stone-900 min-h-[460px] flex flex-col justify-between">
              {/* background image rendering */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{ 
                  backgroundImage: `linear-gradient(to bottom, rgba(27,27,27,0.7) 30%, rgba(27,27,27,0.85) 90%), url(${watchBgImage || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'})` 
                }}
              />

              {/* Simulated navigation menu bar */}
              <div className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/10 backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white font-serif font-bold text-xs">
                    R
                  </div>
                  <span className="font-serif font-bold text-xs text-white">RAS HOTEL</span>
                </div>
                <div className="flex gap-4 text-[10px] text-white/70 font-medium">
                  <span>Home</span>
                  <span>Rooms</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* Hero Contents */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center items-center text-center flex-grow">
                {/* Badge accent */}
                {watchBadge && (
                  <span className="text-[10px] tracking-widest font-bold uppercase text-white bg-primary px-3 py-1 rounded-full mb-4 shadow-sm border border-primary/20">
                    {watchBadge}
                  </span>
                )}

                {/* Subtitle */}
                {watchSubtitle && (
                  <span className="font-serif italic text-sm md:text-base text-gold mt-1">
                    {watchSubtitle}
                  </span>
                )}

                {/* Main Hero Header */}
                <h2 className="font-serif font-bold text-2xl md:text-4xl text-white tracking-tight leading-tight max-w-lg mt-3">
                  {watchTitle1 || 'Imperial Luxury'}{' '}
                  <span className="text-gold block sm:inline">{watchTitle2 || 'Awaits'}</span>
                </h2>

                {/* Tagline */}
                {watchTagline && (
                  <p className="text-xs md:text-sm text-stone-300 font-medium leading-relaxed max-w-md mt-4.5">
                    {watchTagline}
                  </p>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8 shrink-0">
                  {watchCtaBook && (
                    <button type="button" className="px-4 py-2 text-[11px] uppercase tracking-wider font-bold bg-primary text-white hover:bg-red-800 rounded transition-all flex items-center gap-1.5 shadow-md shadow-red-950/20">
                      <Calendar size={12} />
                      {watchCtaBook}
                    </button>
                  )}
                  {watchCtaVideo && (
                    <button type="button" className="px-4 py-2 text-[11px] uppercase tracking-wider font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded transition-all flex items-center gap-1.5">
                      <Play size={12} fill="white" />
                      {watchCtaVideo}
                    </button>
                  )}
                </div>
              </div>

              {/* simulated portal browser footer info */}
              <div className="relative z-10 bg-black/30 border-t border-white/5 py-2 px-4 text-right">
                <span className="text-[8px] text-white/40 tracking-wider">Dire Dawa Ras Hotel Digital Portal - Landing Hero Preview</span>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
