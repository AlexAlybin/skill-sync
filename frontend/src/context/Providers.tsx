'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { AuthProvider, User } from './AuthContext';

export default function Providers({ children, user }: { children: ReactNode, user: User | null }) {
    const [queryClient] = useState(() => new QueryClient());

    console.log("Providers initialized with user:", user);

    return <QueryClientProvider client={queryClient}>
        <AuthProvider user={user}>{children}</AuthProvider>
    </QueryClientProvider>;
}
