import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if session expired query parameter is present
  React.useEffect(() => {
    if (searchParams.get('error') === 'session_expired') {
      toast.error('Your administrator session has expired. Please log in again.');
    }
  }, [searchParams, toast]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      await login(data);
      toast.success('Access granted. Welcome back!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Invalid administrator email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative luxury architectural background lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B0000" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo/Branding Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-white border border-primary/25 flex items-center justify-center text-primary shadow-md mb-3.5">
            <span className="font-serif font-bold text-2xl">R</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-text-dark tracking-tight leading-tight">
            Dire Dawa Ras Hotel
          </h1>
          <p className="text-xs uppercase tracking-widest text-gold-dark font-bold mt-1.5">
            Imperial CMS Portal
          </p>
        </div>

        <Card className="border border-stone-200/80 shadow-xl overflow-hidden bg-white">
          {/* Subtle branding accent bar */}
          <div className="h-1.5 w-full bg-primary" />
          
          <CardContent className="p-8">
            <div className="flex items-center gap-2.5 mb-6 text-stone-700">
              <ShieldCheck className="text-primary shrink-0" size={20} />
              <h2 className="text-base font-bold text-text-dark uppercase tracking-wide">
                Authorized Admin Sign In
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Administrator Email"
                placeholder="admin@rashotel.com"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="relative">
                <Input
                  label="Security Password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-9.5 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full text-sm font-semibold tracking-wide py-3"
                  loading={loading}
                >
                  Verify Credentials
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="text-center mt-6 text-xs text-muted-gray">
          Authorized personnel only. For customer service, please return to the{' '}
          <a href="/" className="text-primary hover:underline font-medium">
            Hotel Homepage
          </a>.
        </div>
      </div>
    </div>
  );
};
