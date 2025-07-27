'use client';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { routeMap } from '@/lib/routes';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const route = routeMap.get(pathname);
    
    if (!loading && route?.protected && !user) {
      router.replace('/login');
    }

    // Optional: role-based restriction
    if (!loading && route?.roles && !route.roles.includes(user?.role ?? '')) {
      router.replace('/unauthorized'); // Optional route
    }
  }, [pathname, loading, user]);

  if (loading || routeMap.get(pathname)?.protected && !user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return <>{children}</>;
}
