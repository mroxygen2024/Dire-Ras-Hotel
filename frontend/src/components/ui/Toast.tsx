import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  text: string;
}

interface ToastContextType {
  toast: {
    success: (text: string) => void;
    error: (text: string) => void;
    info: (text: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  const toast = {
    success: (text: string) => addToast('success', text),
    error: (text: string) => addToast('error', text),
    info: (text: string) => addToast('info', text),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Portal/Container */}
      <div className="fixed bottom-5 right-5 z-55 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm font-medium animate-fade-in translate-y-0 transition-all duration-300 bg-white ${
              t.type === 'success' ? 'border-emerald-100 bg-emerald-50/20 text-emerald-800' :
              t.type === 'error' ? 'border-red-100 bg-red-50/20 text-red-800' :
              'border-blue-100 bg-blue-50/20 text-blue-800'
            }`}
          >
            {t.type === 'success' && <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle size={18} className="text-red-650 shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />}
            
            <div className="flex-grow">{t.text}</div>
            
            <button
              onClick={() => removeToast(t.id)}
              className="text-stone-400 hover:text-stone-600 transition-colors shrink-0 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
};
