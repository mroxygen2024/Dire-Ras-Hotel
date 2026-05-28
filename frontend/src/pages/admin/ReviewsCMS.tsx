import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, ReviewData, ReviewSectionData } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  Check, 
  AlertTriangle,
  Award,
  Globe
} from 'lucide-react';

const reviewFormSchema = z.object({
  name: z.string().min(1, 'Reviewer name is required').trim(),
  platform: z.string().optional().nullable().default('Google Review'),
  text: z.string().min(1, 'Review text is required').trim(),
  rating: z.preprocess((val) => Number(val), z.number().int().min(1).max(5)),
  isApproved: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

const sectionFormSchema = z.object({
  badge: z.string().optional().nullable().default(''),
  title: z.string().min(1, 'Section title is required').trim(),
  subtitle: z.string().optional().nullable().default(''),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;
type SectionFormValues = z.infer<typeof sectionFormSchema>;

export const ReviewsCMS: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Active view tab (Reviews vs Section Config)
  const [activeTab, setActiveTab] = useState<'list' | 'section'>('list');

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);

  // Dynamic star picker state for forms
  const [formRating, setFormRating] = useState(5);

  // Fetch reviews & section configs
  const { data: reviews = [], isLoading: listLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: adminService.getReviews,
  });

  const { data: sectionData, isLoading: sectionLoading } = useQuery({
    queryKey: ['reviews-section'],
    queryFn: adminService.getReviewSection,
  });

  const isLoading = listLoading || sectionLoading;

  // Forms
  const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd, setValue: setValueAdd, formState: { errors: errorsAdd } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      platform: 'Google Review',
      rating: 5,
      isApproved: true,
      isFeatured: false,
    }
  });

  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue: setValueEdit, formState: { errors: errorsEdit } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
  });

  const { register: registerSection, handleSubmit: handleSubmitSection, reset: resetSection, formState: { errors: errorsSection } } = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
  });

  // Reset section form once data loads
  React.useEffect(() => {
    if (sectionData) {
      resetSection({
        badge: sectionData.badge || '',
        title: sectionData.title || '',
        subtitle: sectionData.subtitle || '',
      });
    }
  }, [sectionData, resetSection]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: adminService.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review successfully added!');
      setIsAddOpen(false);
      resetAdd();
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to add review.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReviewData }) => adminService.updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review updated successfully.');
      setIsEditOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update review.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review removed.');
      setIsDeleteOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to delete review.');
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: adminService.updateReviewSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews-section'] });
      toast.success('Reviews page header updated!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update section header.');
    },
  });

  // Toggle controls
  const handleToggleApproved = (review: ReviewData) => {
    if (!review.id) return;
    updateMutation.mutate({
      id: review.id,
      data: {
        ...review,
        isApproved: !review.isApproved,
      },
    });
  };

  const handleOpenEdit = (review: ReviewData) => {
    setSelectedReview(review);
    setFormRating(review.rating);
    resetEdit({
      name: review.name,
      platform: review.platform || 'Google Review',
      text: review.text,
      rating: review.rating,
      isApproved: review.isApproved,
      isFeatured: review.isFeatured,
    });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (review: ReviewData) => {
    setSelectedReview(review);
    setIsDeleteOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-56">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-3.5 w-1/4" />
                <Skeleton className="h-14 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
            Guest Reviews CMS
          </h1>
          <p className="text-sm text-muted-gray mt-1">
            Moderate submitted reviews, configure platform icons, and modify homepage review section headings.
          </p>
        </div>
        
        {activeTab === 'list' && (
          <Button
            onClick={() => {
              setFormRating(5);
              resetAdd({ rating: 5, platform: 'Google Review', isApproved: true });
              setIsAddOpen(true);
            }}
            className="self-start sm:self-center flex items-center gap-2 px-5 cursor-pointer"
          >
            <Plus size={16} /> Add Review
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-5 py-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
            activeTab === 'list'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-stone-500 hover:text-text-dark'
          }`}
        >
          Moderation Panel
        </button>
        <button
          onClick={() => setActiveTab('section')}
          className={`px-5 py-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
            activeTab === 'section'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-stone-500 hover:text-text-dark'
          }`}
        >
          Review Section Config
        </button>
      </div>

      {/* VIEW 1: REVIEWS GRID */}
      {activeTab === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.length === 0 ? (
            <Card className="lg:col-span-2 p-12 text-center border-stone-200/70">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-serif font-bold text-lg text-text-dark">No feedback registered</h3>
              <p className="text-xs text-muted-gray mt-2 leading-relaxed">
                Add reviews manually or await synced feedback from TripAdvisor.
              </p>
            </Card>
          ) : (
            reviews.map((r) => (
              <Card key={r.id} className={`group flex flex-col justify-between border transition-all duration-350 bg-white ${
                r.isApproved ? 'border-stone-200/60 shadow-xs' : 'border-red-200 bg-red-50/5 shadow-xs'
              }`}>
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-text-dark text-base flex items-center gap-2">
                        {r.name}
                        {!r.isApproved && (
                          <span className="text-[9px] uppercase tracking-wider font-bold bg-amber-50 text-gold-dark border border-amber-100 px-1.5 py-0.5 rounded">
                            Pending Approval
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] text-muted-gray uppercase tracking-widest font-bold flex items-center gap-1 mt-0.5">
                        <Globe size={11} className="text-stone-400" />
                        {r.platform || 'Google Review'}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 shrink-0 bg-stone-50 px-2 py-1 border border-stone-200/50 rounded-lg">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill={i < r.rating ? '#D4AF37' : 'none'}
                          className={i < r.rating ? 'text-gold' : 'text-stone-300'}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-stone-600 italic font-medium leading-relaxed">
                    "{r.text}"
                  </p>
                </div>

                <div className="px-6 py-4.5 bg-stone-50/50 border-t border-stone-100 flex items-center justify-between">
                  {/* Approve Toggle */}
                  <Button
                    onClick={() => handleToggleApproved(r)}
                    variant="ghost"
                    className={`text-[10px] px-3 py-1.5 border uppercase tracking-wider font-bold cursor-pointer ${
                      r.isApproved 
                        ? 'border-emerald-250 bg-emerald-50 text-emerald-800' 
                        : 'border-amber-250 bg-amber-50 text-gold-dark'
                    }`}
                  >
                    {r.isApproved ? 'Approved' : 'Approve Review'}
                  </Button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(r)}
                      className="p-2 text-stone-500 hover:bg-stone-100 hover:text-text-dark rounded transition-colors cursor-pointer"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleOpenDelete(r)}
                      className="p-2 text-red-650 hover:bg-red-50 hover:text-red-750 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* VIEW 2: SECTION CONFIG FORM */}
      {activeTab === 'section' && (
        <Card className="max-w-2xl border-stone-200/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-primary" size={18} />
              Review Page Header Styling
            </CardTitle>
            <CardDescription>Update the accent badges and headlines of the public reviews section</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitSection((data) => updateSectionMutation.mutate(data))}>
            <CardContent className="space-y-5">
              <Input
                label="Accent Badge Title"
                placeholder="GUEST EXPERIENCE"
                error={errorsSection.badge?.message}
                {...registerSection('badge')}
              />
              <Input
                label="Core Section Heading"
                placeholder="What Our Royal Guests Say"
                error={errorsSection.title?.message}
                {...registerSection('title')}
              />
              <Textarea
                label="Supportive Subtitle Description"
                placeholder="Explore authentic testimonies shared by travelers..."
                error={errorsSection.subtitle?.message}
                {...registerSection('subtitle')}
              />
            </CardContent>
            <div className="px-6 py-4.5 bg-stone-50/50 border-t border-stone-100 flex items-center justify-end gap-3">
              <Button type="submit" loading={updateSectionMutation.isPending} className="cursor-pointer">
                Save Section Headers
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* ==========================================
          MODAL 1: ADD REVIEW
         ========================================== */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Guest Review">
        <form onSubmit={handleSubmitAdd((data) => createMutation.mutate({ ...data, rating: formRating }))} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Reviewer Full Name" error={errorsAdd.name?.message} {...registerAdd('name')} />
            <Input label="Source Platform (e.g. TripAdvisor, Google)" error={errorsAdd.platform?.message} {...registerAdd('platform')} />
          </div>

          {/* Graphical Star Picker */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-1.5 block">Star Rating</label>
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg p-3 w-max">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormRating(star)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    size={22}
                    fill={star <= formRating ? '#D4AF37' : 'none'}
                    className={star <= formRating ? 'text-gold' : 'text-stone-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          <Textarea label="Guest Comment Text" error={errorsAdd.text?.message} {...registerAdd('text')} />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button type="submit" loading={createMutation.isPending} className="cursor-pointer">Add Review</Button>
          </div>
        </form>
      </Modal>

      {/* ==========================================
          MODAL 2: EDIT REVIEW
         ========================================== */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Review details">
        <form onSubmit={handleSubmitEdit((data) => {
          if (!selectedReview?.id) return;
          updateMutation.mutate({ id: selectedReview.id, data: { ...data, rating: formRating } });
        })} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Reviewer Full Name" error={errorsEdit.name?.message} {...registerEdit('name')} />
            <Input label="Source Platform" error={errorsEdit.platform?.message} {...registerEdit('platform')} />
          </div>

          {/* Graphical Star Picker */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-1.5 block">Star Rating</label>
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg p-3 w-max">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormRating(star)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    size={22}
                    fill={star <= formRating ? '#D4AF37' : 'none'}
                    className={star <= formRating ? 'text-gold' : 'text-stone-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          <Textarea label="Guest Comment Text" error={errorsEdit.text?.message} {...registerEdit('text')} />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button type="submit" loading={updateMutation.isPending} className="cursor-pointer">Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* ==========================================
          MODAL 3: DELETE CONFIRMATION
         ========================================== */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Review" size="sm">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-650 mx-auto">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-text-dark">Remove Review by {selectedReview?.name}?</h3>
            <p className="text-xs text-muted-gray mt-2 leading-relaxed font-medium">
              Are you sure you want to permanently delete this guest testimonial?
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={() => setIsDeleteOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button
              type="button"
              variant="danger"
              loading={deleteMutation.isPending}
              onClick={() => selectedReview?.id && deleteMutation.mutate(selectedReview.id)}
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
