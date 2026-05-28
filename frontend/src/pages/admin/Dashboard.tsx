import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { 
  BedDouble, 
  Briefcase, 
  MessageSquare, 
  HeartHandshake, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  // Fetch real rooms, services, reviews, and info from our backend API!
  const { data: rooms = [], isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: adminService.getRooms,
  });

  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: adminService.getServices,
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: adminService.getReviews,
  });

  const { data: hotelInfo, isLoading: infoLoading } = useQuery({
    queryKey: ['hotel-info'],
    queryFn: adminService.getHotelInfo,
  });

  const isLoading = roomsLoading || servicesLoading || reviewsLoading || infoLoading;

  // Compute key stats
  const totalRooms = rooms.length;
  const featuredRooms = rooms.filter(r => r.featured).length;
  const totalServices = services.length;
  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter(r => r.isApproved).length;

  const latestReviews = [...reviews]
    .slice(0, 3); // Take top 3 recent reviews

  const statCards = [
    {
      title: 'Total Rooms',
      value: totalRooms,
      desc: `${featuredRooms} Featured on Website`,
      icon: BedDouble,
      color: 'text-primary bg-red-50 border-red-100',
      link: '/admin/rooms'
    },
    {
      title: 'Active Services',
      value: totalServices,
      desc: 'Spa, Restaurant, Bar & more',
      icon: Briefcase,
      color: 'text-amber-700 bg-amber-50 border-amber-100',
      link: '/admin/services'
    },
    {
      title: 'Guest Reviews',
      value: totalReviews,
      desc: `${approvedReviews} Approved & Published`,
      icon: MessageSquare,
      color: 'text-blue-700 bg-blue-50 border-blue-100',
      link: '/admin/reviews'
    },
    {
      title: 'Brand Health',
      value: '98%',
      desc: 'Excellent reputation index',
      icon: HeartHandshake,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      link: '/admin/hotel-info'
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-3.5 w-32" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Panel Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="h-[300px]">
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-72" />
              </CardHeader>
            </Card>
          </div>
          <div>
            <Card className="h-[300px]">
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
            Imperial Dashboard
          </h1>
          <p className="text-sm text-muted-gray mt-1 flex items-center gap-1.5">
            <Sparkles size={14} className="text-gold-dark" />
            Managing <span className="font-semibold text-text-dark">{hotelInfo?.name || 'Dire Dawa Ras Hotel'}</span>
          </p>
        </div>
        <div className="text-xs text-stone-500 font-semibold px-4 py-2 border border-stone-200 bg-white rounded-lg self-start">
          Database Status: <span className="text-emerald-650">Healthy</span>
        </div>
      </div>

      {/* Grid of Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <Card key={i} className="hover:shadow-md transition-all duration-300 group border-stone-200/70">
            <Link to={card.link}>
              <CardContent className="p-6 flex justify-between items-start cursor-pointer">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-muted-gray">
                    {card.title}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-text-dark mt-2.5">
                    {card.value}
                  </h3>
                  <p className="text-xs text-stone-500 mt-2 font-medium">
                    {card.desc}
                  </p>
                </div>
                <div className={`p-3 border rounded-xl transition-colors duration-300 group-hover:scale-105 ${card.color}`}>
                  <card.icon size={20} />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Content Layout: Recent reviews & updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent reviews list */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-stone-200/70">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Guest Reviews</CardTitle>
                <CardDescription>Latest comments from TripAdvisor and Google Review</CardDescription>
              </div>
              <Link
                to="/admin/reviews"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                Manage All <ArrowRight size={14} />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {latestReviews.length === 0 ? (
                <div className="p-8 text-center text-stone-400 text-sm font-medium">
                  No reviews submitted yet.
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {latestReviews.map((r, index) => (
                    <div key={r.id || index} className="p-6 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-text-dark font-bold font-serif text-sm border border-stone-200">
                        {r.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-text-dark truncate">{r.name}</h4>
                          <span className="text-[10px] uppercase font-bold text-muted-gray tracking-wider bg-stone-100 px-2 py-0.5 rounded">
                            {r.platform || 'Google'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 my-1">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-sm ${i < r.rating ? 'text-amber-500' : 'text-stone-250'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-gray line-clamp-2 mt-1.5 leading-relaxed font-medium">
                          "{r.text}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Operations Guide / Overview */}
        <div className="space-y-6">
          <Card className="border-stone-200/70 bg-gradient-to-br from-white to-stone-50/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-primary" size={18} />
                Quick Guides
              </CardTitle>
              <CardDescription>Hotel updates guidelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs leading-relaxed text-muted-gray font-medium">
              <div className="p-3.5 bg-red-50/30 border border-primary/10 rounded-lg">
                <span className="font-bold text-text-dark block mb-1">Room Prices</span>
                When adding or updating rooms, please ensure price formats are valid positive decimals. Featured rooms will show directly on the landing page slider.
              </div>
              
              <div className="p-3.5 bg-amber-50/20 border border-amber-100/60 rounded-lg">
                <span className="font-bold text-text-dark block mb-1">Reviews Management</span>
                Guests reviews must be approved to be visible on the public hotel homepage carousel. You can also manually add/edit customer feedback.
              </div>

              <div className="p-3.5 bg-stone-100/60 border border-stone-200/60 rounded-lg">
                <span className="font-bold text-text-dark block mb-1">Heritage Content</span>
                Dire Dawa Ras Hotel is a royal historical landmark. Always review typography and photos carefully to maintain branding elegance.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
