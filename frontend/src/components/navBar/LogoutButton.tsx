'use client';

import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import styles from './LogoutButton.module.css';
import { useAuth } from '@/context/AuthContext';

export default function LogoutButton() {
    const router = useRouter();
    const { setUser } = useAuth();


    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout');
            setUser(null);
            router.replace('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <button onClick={handleLogout} className={styles.button}>
            Logout
        </button>
    );
}
