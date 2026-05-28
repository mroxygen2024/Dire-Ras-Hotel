import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, AboutPageData, StorySectionData, TimelineEventData } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { 
  History, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  BookOpen, 
  Sparkles,
  AlignLeft,
  AlignRight,
  ImageIcon
} from 'lucide-react';

const aboutPageSchema = z.object({
  title: z.string().min(1, 'General title is required').trim(),
  subtitle: z.string().optional().nullable().default(''),
  mainImageUrl: z.string().min(1, 'Main banner image URL is required').trim(),
});

type AboutPageFormValues = z.infer<typeof aboutPageSchema>;

export const AboutHeritageCMS: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Accordion active toggles
  const [openSection, setOpenSection] = useState<'settings' | 'stories' | 'timeline'>('settings');

  // Modal sub-states
  const [editingStory, setEditingStory] = useState<StorySectionData | null>(null);
  const [editingEvent, setEditingEvent] = useState<TimelineEventData | null>(null);

  // Form states for creating new items
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [newStoryDesc, setNewStoryDesc] = useState('');
  const [newStoryImg, setNewStoryImg] = useState('');
  const [newStoryAlign, setNewStoryAlign] = useState(false);

  const [newEventYear, setNewEventYear] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');

  // Fetch full About Heritage data (API or fallback)
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['about-heritage'],
    queryFn: adminService.getAboutHeritage,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AboutPageFormValues>({
    resolver: zodResolver(aboutPageSchema),
  });

  // Prefill general settings
  React.useEffect(() => {
    if (aboutData) {
      reset({
        title: aboutData.title || '',
        subtitle: aboutData.subtitle || '',
        mainImageUrl: aboutData.mainImageUrl || '',
      });
    }
  }, [aboutData, reset]);

  // Mutation to persist entire updated AboutHeritage structure
  const saveMutation = useMutation({
    mutationFn: adminService.updateAboutHeritage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-heritage'] });
      toast.success('Storytelling and heritage updates saved successfully!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update storytelling details.');
    },
  });

  const handleSaveGeneral = (data: AboutPageFormValues) => {
    if (!aboutData) return;
    saveMutation.mutate({
      ...aboutData,
      ...data,
    });
  };

  // ==========================================
  // Story Segment Operations
  // ==========================================
  const handleAddStory = () => {
    if (!aboutData || !newStoryTitle.trim() || !newStoryDesc.trim()) {
      toast.error('Title and description are required for narrative chapters.');
      return;
    }

    const newStory: StorySectionData = {
      id: `story-${Math.random().toString(36).substring(2, 9)}`,
      title: newStoryTitle.trim(),
      description: newStoryDesc.trim(),
      imageUrl: newStoryImg.trim() || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
      alignRight: newStoryAlign,
      order: aboutData.stories.length,
    };

    saveMutation.mutate({
      ...aboutData,
      stories: [...aboutData.stories, newStory],
    });

    // Reset fields
    setNewStoryTitle('');
    setNewStoryDesc('');
    setNewStoryImg('');
    setNewStoryAlign(false);
  };

  const handleDeleteStory = (id: string) => {
    if (!aboutData) return;
    const filteredStories = aboutData.stories
      .filter((s) => s.id !== id)
      .map((s, index) => ({ ...s, order: index })); // Reorder remaining

    saveMutation.mutate({
      ...aboutData,
      stories: filteredStories,
    });
  };

  const handleToggleStoryAlignment = (id: string) => {
    if (!aboutData) return;
    const updatedStories = aboutData.stories.map((s) => 
      s.id === id ? { ...s, alignRight: !s.alignRight } : s
    );
    saveMutation.mutate({
      ...aboutData,
      stories: updatedStories,
    });
  };

  // ==========================================
  // Timeline Event Operations
  // ==========================================
  const handleAddEvent = () => {
    if (!aboutData || !newEventYear.trim() || !newEventTitle.trim()) {
      toast.error('Year and title are required for timeline entries.');
      return;
    }

    const newEvent: TimelineEventData = {
      id: `event-${Math.random().toString(36).substring(2, 9)}`,
      year: newEventYear.trim(),
      title: newEventTitle.trim(),
      description: newEventDesc.trim(),
      order: aboutData.events.length,
    };

    saveMutation.mutate({
      ...aboutData,
      events: [...aboutData.events, newEvent],
    });

    setNewEventYear('');
    setNewEventTitle('');
    setNewEventDesc('');
  };

  const handleDeleteEvent = (id: string) => {
    if (!aboutData) return;
    const filteredEvents = aboutData.events
      .filter((e) => e.id !== id)
      .map((e, index) => ({ ...e, order: index }));

    saveMutation.mutate({
      ...aboutData,
      events: filteredEvents,
    });
  };

  const handleReorderEvent = (index: number, direction: 'up' | 'down') => {
    if (!aboutData) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= aboutData.events.length) return;

    const eventsCopy = [...aboutData.events].sort((a, b) => a.order - b.order);
    
    // Swap orders
    const currentOrder = eventsCopy[index].order;
    eventsCopy[index].order = eventsCopy[targetIndex].order;
    eventsCopy[targetIndex].order = currentOrder;

    saveMutation.mutate({
      ...aboutData,
      events: eventsCopy,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-20" />
        ))}
      </div>
    );
  }

  const sortedStories = aboutData ? [...aboutData.stories].sort((a, b) => a.order - b.order) : [];
  const sortedEvents = aboutData ? [...aboutData.events].sort((a, b) => a.order - b.order) : [];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
          About & Heritage Storytelling CMS
        </h1>
        <p className="text-sm text-muted-gray mt-1">
          Compose deep imperial histories, modular illustrated narrative chapters, and Chronological timeline items.
        </p>
      </div>

      <div className="space-y-4.5">
        
        {/* ==========================================
            ACCORDION PANEL 1: CORE ABOUT PAGE SETTINGS
           ========================================== */}
        <Card className="border-stone-200/70 overflow-hidden bg-white">
          <button
            onClick={() => setOpenSection(openSection === 'settings' ? 'stories' : 'settings')}
            className="w-full px-6 py-4.5 flex items-center justify-between font-serif font-bold text-lg text-text-dark border-b border-stone-100 hover:bg-stone-50 transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <BookOpen size={18} className="text-primary shrink-0" />
              1. Core Storytelling Page Settings
            </span>
            {openSection === 'settings' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {openSection === 'settings' && (
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(handleSaveGeneral)} className="space-y-5">
                <Input
                  label="Narrative Page Core Title"
                  error={errors.title?.message}
                  {...register('title')}
                />
                
                <Textarea
                  label="Introductory Subheading Slogan"
                  error={errors.subtitle?.message}
                  {...register('subtitle')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                  <Input
                    label="Main History Header Banner Image URL"
                    error={errors.mainImageUrl?.message}
                    {...register('mainImageUrl')}
                  />
                  {aboutData?.mainImageUrl && (
                    <div className="h-10.5 border border-stone-250 rounded-lg overflow-hidden flex items-center justify-center p-1 bg-stone-50 max-w-xs">
                      <img src={aboutData.mainImageUrl} alt="Header banner thumbnail" className="h-full object-contain rounded" />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end">
                  <Button type="submit" loading={saveMutation.isPending} className="px-5 cursor-pointer">
                    Save Narrative Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>

        {/* ==========================================
            ACCORDION PANEL 2: STORY SECTIONS
           ========================================== */}
        <Card className="border-stone-200/70 overflow-hidden bg-white">
          <button
            onClick={() => setOpenSection(openSection === 'stories' ? 'timeline' : 'stories')}
            className="w-full px-6 py-4.5 flex items-center justify-between font-serif font-bold text-lg text-text-dark border-b border-stone-100 hover:bg-stone-50 transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Sparkles size={18} className="text-primary shrink-0" />
              2. Modular Chapters & Illustrated Narratives ({sortedStories.length})
            </span>
            {openSection === 'stories' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {openSection === 'stories' && (
            <CardContent className="p-6 space-y-6">
              
              {/* Existing Story segments */}
              <div className="space-y-5">
                {sortedStories.map((story) => (
                  <div key={story.id} className="p-4 bg-stone-50/70 border border-stone-200/60 rounded-xl flex flex-col md:flex-row gap-5 items-center justify-between hover:bg-stone-55/20 transition-all duration-200">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
                      <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5 text-center md:text-left">
                      <h4 className="font-bold text-text-dark text-base flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                        {story.title}
                        <button
                          type="button"
                          onClick={() => handleToggleStoryAlignment(story.id)}
                          className={`text-[9px] uppercase tracking-wider font-bold border px-2 py-0.5 rounded cursor-pointer ${
                            story.alignRight 
                              ? 'border-amber-250 bg-amber-50 text-gold-dark' 
                              : 'border-stone-250 text-stone-500'
                          }`}
                        >
                          {story.alignRight ? 'Aligned Right' : 'Aligned Left'}
                        </button>
                      </h4>
                      <p className="text-xs text-muted-gray leading-relaxed font-medium line-clamp-3">
                        {story.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <button
                        onClick={() => handleDeleteStory(story.id)}
                        className="p-2 text-stone-400 hover:text-red-650 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {sortedStories.length === 0 && (
                  <div className="p-8 text-center text-stone-400 text-xs italic">No narrative chapters built yet.</div>
                )}
              </div>

              {/* Add New Story Panel */}
              <div className="p-5 border border-dashed border-stone-300 rounded-xl bg-stone-50/20 space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-600 flex items-center gap-1.5">
                  <Plus size={14} /> Add New Narrative Chapter
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Chapter Title" 
                    placeholder="e.g. Franco-Ethiopian Railway Connection"
                    value={newStoryTitle}
                    onChange={(e) => setNewStoryTitle(e.target.value)}
                  />
                  <Input 
                    label="Chapter Banner Image URL" 
                    placeholder="https://images.unsplash.com/..."
                    value={newStoryImg}
                    onChange={(e) => setNewStoryImg(e.target.value)}
                  />
                </div>

                <Textarea 
                  label="Chapter Narrative Description" 
                  placeholder="Elaborate details about this historic milestone..."
                  value={newStoryDesc}
                  onChange={(e) => setNewStoryDesc(e.target.value)}
                />

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="new-story-align"
                      checked={newStoryAlign}
                      onChange={(e) => setNewStoryAlign(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary rounded border-stone-300"
                    />
                    <label htmlFor="new-story-align" className="text-xs font-bold text-text-dark uppercase tracking-wider cursor-pointer">
                      Align Picture to Right
                    </label>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={handleAddStory}
                    loading={saveMutation.isPending}
                    size="sm"
                    className="cursor-pointer"
                  >
                    Add Chapter
                  </Button>
                </div>
              </div>

            </CardContent>
          )}
        </Card>

        {/* ==========================================
            ACCORDION PANEL 3: TIMELINE EVENTS
           ========================================== */}
        <Card className="border-stone-200/70 overflow-hidden bg-white">
          <button
            onClick={() => setOpenSection(openSection === 'timeline' ? 'settings' : 'timeline')}
            className="w-full px-6 py-4.5 flex items-center justify-between font-serif font-bold text-lg text-text-dark border-b border-stone-100 hover:bg-stone-50 transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <History size={18} className="text-primary shrink-0" />
              3. Chronological Heritage Timeline ({sortedEvents.length} Events)
            </span>
            {openSection === 'timeline' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {openSection === 'timeline' && (
            <CardContent className="p-6 space-y-6">
              
              {/* Timeline Preview & Reorder Table */}
              <div className="space-y-4">
                {sortedEvents.map((event, index) => (
                  <div key={event.id} className="p-4 bg-stone-50/50 border border-stone-200/60 rounded-xl flex items-center justify-between gap-4">
                    
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleReorderEvent(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-stone-100 text-stone-400 hover:text-primary disabled:opacity-30 rounded cursor-pointer"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReorderEvent(index, 'down')}
                        disabled={index === sortedEvents.length - 1}
                        className="p-1 hover:bg-stone-100 text-stone-400 hover:text-primary disabled:opacity-30 rounded cursor-pointer"
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>

                    {/* Year badge */}
                    <div className="px-3.5 py-2 bg-primary text-white font-serif font-bold text-sm rounded-lg shrink-0 shadow-sm shadow-red-900/10">
                      {event.year}
                    </div>

                    <div className="flex-grow min-w-0 space-y-1">
                      <h4 className="font-bold text-text-dark text-sm truncate">{event.title}</h4>
                      <p className="text-xs text-muted-gray leading-relaxed font-medium line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1.5 text-stone-400 hover:text-red-650 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}

                {sortedEvents.length === 0 && (
                  <div className="p-8 text-center text-stone-400 text-xs italic">No timeline occurrences built yet.</div>
                )}
              </div>

              {/* Add New Event Panel */}
              <div className="p-5 border border-dashed border-stone-300 rounded-xl bg-stone-50/20 space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-600 flex items-center gap-1.5">
                  <Plus size={14} /> Add Chronological Event
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <Input 
                      label="Event Year" 
                      placeholder="e.g. 1947"
                      value={newEventYear}
                      onChange={(e) => setNewEventYear(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Input 
                      label="Event Short Title" 
                      placeholder="e.g. Construction blueprints commissioned"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                    />
                  </div>
                </div>

                <Textarea 
                  label="Event Historical description" 
                  placeholder="Detail explaining this timeline occurrence..."
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                />

                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={handleAddEvent}
                    loading={saveMutation.isPending}
                    size="sm"
                    className="cursor-pointer"
                  >
                    Insert Event
                  </Button>
                </div>
              </div>

            </CardContent>
          )}
        </Card>

      </div>
    </div>
  );
};
