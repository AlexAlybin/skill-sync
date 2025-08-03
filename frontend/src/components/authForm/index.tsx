'use client';
import { FC, useActionState, useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { appRoutes, paths, routeMap } from '@/lib/routes';
import { useAuth } from '@/context/AuthContext';
import { useFormStatus } from 'react-dom';
import { login } from '@/app/login/actions';

type Props = {
    type: 'login' | 'signup';
};

export default function AuthForm({ type }: Props) {
    const isLogin = type === 'login';

    const [state, formAction] = useActionState(login, undefined);


    return (
        <form action={formAction}>
            {type === 'signup' && (
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                />
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
            />
            {/* {error && <p >{error}</p>} */}
            <AuthForm.SubmitButton isLogin={isLogin} />
        </form>
    );
}

AuthForm.SubmitButton = ({ isLogin }: { isLogin: boolean }) => {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit">
            {isLogin ? 'Log In' : 'Sign Up'}
        </button>
    );
}