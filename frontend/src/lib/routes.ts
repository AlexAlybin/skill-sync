export type RouteMeta = {
  path: string;
  protected?: boolean;
  roles?: string[]; 
};

export const paths = {
  home: '/',
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  profile: '/profile',
  admin: '/admin',
};

export const appRoutes: Record<keyof typeof paths, RouteMeta> = {   
  home: { path: '/', protected: false },
  login: { path: '/login', protected: false },
  signup: { path: '/signup', protected: false },
  dashboard: { path: '/dashboard', protected: true },
  profile: { path: '/profile', protected: true },
  admin: { path: '/admin', protected: true, roles: ['admin'] },
};

export const routeMap = new Map(Object.values(appRoutes).map((r) => [r.path, r]));
