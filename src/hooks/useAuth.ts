import { useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  username: string;
  avatar: string | null;
  isAdmin: boolean;
}

export function useAuth() {
  const [user, setUser]       = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (data.authenticated) setUser(data.user);
        else setUser(null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login  = () => { window.location.href = '/api/auth/login'; };
  const logout = () => { window.location.href = '/api/auth/logout'; };

  return { user, loading, login, logout };
}
