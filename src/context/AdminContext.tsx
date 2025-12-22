import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AdminContextType {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  enableAdmin: () => void;
  disableAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialAdmin = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('resetAdmin') === '1' || params.get('enableAdmin') === '0') {
        localStorage.setItem('adminMode', '0');
        return false;
      }
      if (params.get('enableAdmin') === '1') {
        localStorage.setItem('adminMode', '1');
        return true;
      }
      return localStorage.getItem('adminMode') === '1';
    } catch {
      return false;
    }
  })();
  const [isAdminMode, setIsAdminMode] = useState(initialAdmin);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === 'adminMode') {
        const v = e.newValue === '1';
        setIsAdminMode(v);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleAdminMode = () => {
    setIsAdminMode(prev => {
      const next = !prev;
      try { localStorage.setItem('adminMode', next ? '1' : '0'); } catch {}
      return next;
    });
  };

  const enableAdmin = () => {
    setIsAdminMode(true);
    try { localStorage.setItem('adminMode', '1'); } catch {}
  };

  const disableAdmin = () => {
    setIsAdminMode(false);
    try { localStorage.setItem('adminMode', '0'); } catch {}
  };

  return (
    <AdminContext.Provider value={{ isAdminMode, toggleAdminMode, enableAdmin, disableAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
