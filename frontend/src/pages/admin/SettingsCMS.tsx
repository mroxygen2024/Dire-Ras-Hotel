import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Database, LogOut, Monitor, Palette, Cookie } from 'lucide-react';

export const SettingsCMS: React.FC = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Portal Settings</p>
        <h1 className="text-3xl font-serif font-bold text-text-dark tracking-tight">Account & System Settings</h1>
        <p className="text-sm text-muted-gray max-w-2xl">
          Review the active administrator profile, connection state, and portal preferences used by the heritage CMS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary" size={18} /> Active Admin Profile</CardTitle>
            <CardDescription>Profile data loaded from the JWT session.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-stone-400">Name</p>
              <p className="mt-2 text-sm font-semibold text-text-dark">{admin?.firstName || 'Hotel'} {admin?.lastName || 'Admin'}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-stone-400">Email</p>
              <p className="mt-2 text-sm font-semibold text-text-dark break-all">{admin?.email}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-stone-400">Role</p>
              <p className="mt-2 text-sm font-semibold text-text-dark">{admin?.role || 'SUPERADMIN'}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-stone-400">Session</p>
              <p className="mt-2 text-sm font-semibold text-emerald-700">Persisted in local storage</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Database className="text-primary" size={18} /> Backend Connection</CardTitle>
              <CardDescription>Axios is configured for the Express CMS API.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-stone-600">
              <div className="flex items-center gap-2"><Monitor size={15} /> http://localhost:5000/api</div>
              <div className="flex items-center gap-2"><Cookie size={15} /> Token stored in local storage</div>
              <div className="flex items-center gap-2"><Palette size={15} /> Heritage maroon + cream theme</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Button variant="danger" className="w-full gap-2" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};