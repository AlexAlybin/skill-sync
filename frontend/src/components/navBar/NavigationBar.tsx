"use client";
import { FC } from "react";
import Link from "next/link";
import styles from './NavigationBar.module.css';
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/context/AuthContext";

const NavigationBar: FC = () => {
    const { user } = useAuth();
    return (
        <nav>
            <ul className={styles.navList}>
                {user ? <>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/dashboard/skills">Skills</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                    <li><LogoutButton /></li>
                </>
                    :
                    <>
                        <li><Link href="/login">Login</Link></li>
                        <li><Link href="/signup">Register</Link></li>
                    </>}
            </ul>
        </nav>
    );
}

export default NavigationBar;
