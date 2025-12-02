import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      isAuthenticated: false,
      login: () => {},
      logout: () => {},
    };
  }
  return ctx;
};

export default useAuth;
