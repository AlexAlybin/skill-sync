'use client';

import styles from './LogoutButton.module.css';
import { logout } from '@/app/login/actions';

export default function LogoutButton() {
    return (
        <button onClick={() => logout()} className={styles.button}>
            Logout
        </button>
    );
}
