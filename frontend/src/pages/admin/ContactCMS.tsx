import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, ContactPageData } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { Contact, Globe, MessageSquarePlus, MapPin, Send } from 'lucide-react';

const contactPageSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  subtitle: z.string().optional().nullable().default(''),
  introText: z.string().optional().nullable().default(''),
  formTitle: z.string().optional().nullable().default(''),
  nameLabel: z.string().optional().nullable().default(''),
  emailLabel: z.string().optional().nullable().default(''),
  phoneLabel: z.string().optional().nullable().default(''),
  msgLabel: z.string().optional().nullable().default(''),
  submitBtn: z.string().optional().nullable().default(''),
  description: z.string().optional().nullable().default(''),
  phone: z.string().optional().nullable().default(''),
  email: z.string().optional().nullable().default(''),
  whatsappLink: z.string().optional().nullable().default(''),
});

type ContactFormValues = z.infer<typeof contactPageSchema>;

export const ContactCMS: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Fetch current contact config from API
  const { data: contactPageData, isLoading } = useQuery({
    queryKey: ['contact-page'],
    queryFn: adminService.getContactPage,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactPageSchema),
  });

  // Prefill form
  React.useEffect(() => {
    if (contactPageData) {
      reset({
        title: contactPageData.title || '',
        subtitle: contactPageData.subtitle || '',
        introText: contactPageData.introText || '',
        formTitle: contactPageData.formTitle || '',
        nameLabel: contactPageData.nameLabel || '',
        emailLabel: contactPageData.emailLabel || '',
        phoneLabel: contactPageData.phoneLabel || '',
        msgLabel: contactPageData.msgLabel || '',
        submitBtn: contactPageData.submitBtn || '',
        description: contactPageData.description || '',
        phone: contactPageData.phone || '',
        email: contactPageData.email || '',
        whatsappLink: contactPageData.whatsappLink || '',
      });
    }
  }, [contactPageData, reset]);

  // Mutation to save configs in Express
  const updateMutation = useMutation({
    mutationFn: adminService.updateContactPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-page'] });
      toast.success('Contact Page configuration updated successfully!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update contact config.');
    },
  });

  const onSubmit = (data: ContactFormValues) => {
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
          <Card className="h-112.5" />
          <Card className="h-112.5" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
          Contact Page CMS
        </h1>
        <p className="text-sm text-muted-gray mt-1">
          Customize physical coordinates, inquiry form text fields, and branding messages for custom guest forms.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* General coordinates (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-stone-200/70 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="text-primary" size={18} />
                  Main Coordinates & Branding Copy
                </CardTitle>
                <CardDescription>Configure core titles and corporate support emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Page Main Header"
                    error={errors.title?.message}
                    {...register('title')}
                  />
                  <Input
                    label="Support Subtitle"
                    error={errors.subtitle?.message}
                    {...register('subtitle')}
                  />
                </div>

                <Textarea
                  label="Introductory Segment Paragraph"
                  placeholder="Have questions about booking or looking to host a royal wedding?..."
                  error={errors.introText?.message}
                  {...register('introText')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Corporate Support Email"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <Input
                    label="General Hotline Telephone"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>

                <Input
                  label="Direct WhatsApp Link Address"
                  placeholder="https://wa.me/..."
                  error={errors.whatsappLink?.message}
                  {...register('whatsappLink')}
                />

                <Textarea
                  label="Additional Description Copy"
                  error={errors.description?.message}
                  {...register('description')}
                />
              </CardContent>
            </Card>
          </div>

          {/* Inquiry form customization (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
            <Card className="border-stone-200/70 bg-linear-to-br from-white to-stone-50/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquarePlus className="text-primary" size={18} />
                  Form Label Customizer
                </CardTitle>
                <CardDescription>Translate or rename labels on the guest inquiry form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input
                  label="Form Title / Card Header"
                  placeholder="Send Us a Message"
                  error={errors.formTitle?.message}
                  {...register('formTitle')}
                />

                <Input
                  label="Full Name Field Label"
                  placeholder="Your Name"
                  error={errors.nameLabel?.message}
                  {...register('nameLabel')}
                />

                <Input
                  label="Email Field Label"
                  placeholder="Your Email"
                  error={errors.emailLabel?.message}
                  {...register('emailLabel')}
                />

                <Input
                  label="Phone Field Label"
                  placeholder="Your Phone Number"
                  error={errors.phoneLabel?.message}
                  {...register('phoneLabel')}
                />

                <Input
                  label="Message Box Label"
                  placeholder="Your Message"
                  error={errors.msgLabel?.message}
                  {...register('msgLabel')}
                />

                <Input
                  label="Action Button Text"
                  placeholder="Send Inquiry"
                  error={errors.submitBtn?.message}
                  {...register('submitBtn')}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                loading={updateMutation.isPending}
                className="w-full text-sm font-semibold tracking-wide py-3.5 cursor-pointer"
              >
                Apply Form Customizations
              </Button>
              <p className="text-[10px] text-center text-muted-gray leading-normal">
                Modifying form labels allows instant localization and custom taglines on guest-facing contact portals.
              </p>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
