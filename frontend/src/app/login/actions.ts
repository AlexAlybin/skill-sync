
"use server";

import axios from "@/lib/axios";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function login(prevState: any, formData: FormData) {
    console.log("login action called", { formData, processEnv: process.env.NEXT_PUBLIC_API_BASE_URL });
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { user } = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/getUser`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then(res => res.json());

    if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: true,
        });
    }

    redirect("/dashboard/skills");
}

export async function logout() {
    (await cookies()).delete("token");
    redirect("/login");
}
