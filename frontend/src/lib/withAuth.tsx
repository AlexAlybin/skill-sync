import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { JSX } from 'react';

const JWT_SECRET = process.env.JWT_SECRET!;

export function withAuth<P>(PageComponent: (props: P & { user: any }) => JSX.Element) {
    return async function AuthenticatedPage(props: P) {
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        if (!token) {
            return redirect('/login');
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return <PageComponent {...props} user={decoded} />;
        } catch (err) {
            console.error("JWT decode failed:", err);
            return redirect('/login');
        }
    }
}