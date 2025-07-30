'use client';
import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { appRoutes, paths, routeMap } from '@/lib/routes';
import { useAuth } from '@/context/AuthContext';

type Props = {
    type: 'login' | 'signup';
};

export default function AuthForm({ type }: Props) {
    const [form, setForm] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');

    const router = useRouter();
    const { setUser } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = type === 'login' ? '/auth/login' : '/auth/signup';

        const payload = {
            email: form.email,
            password: form.password,
            ...(type === 'signup' && { name: form.name }),
        };

        try {
            const res = await api.post(endpoint, payload);
            if (res.data) { 
                setUser(res.data.user);
                router.push(`${paths.dashboard}/skills`); }
        } catch (err: any) {
            const message =
                err.response?.data?.message || 'Something went wrong';
            setError(message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
            {type === 'signup' && (
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                />
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {type === 'login' ? 'Log In' : 'Sign Up'}
            </button>
        </form>
    );
}
