"use client";
import { FC } from "react";
import Link from "next/link";
import styles from './NavigationBar.module.css';
import LogoutButton from "./LogoutButton";

const NavigationBar: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
        return (
        <nav>
            <ul className={styles.navList}>
                {isLoggedIn ?
                    <>
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
