"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeadlineXL } from "@/app/component/typography";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function onLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/"); // Redirect to home page after successful login
        } catch (ignored: unknown) {
            void ignored;
            setError("Login failed. Please check your credentials and try again."); // Don't expose firebase error details to user (intentionally)
        }
    }
    return (
        <div className="max-w-md mx-auto m-10 p-6">
            <HeadlineXL>Login</HeadlineXL>
            <form onSubmit={onLogin} className="flex flex-col gap-4 mt-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-2 border-[var(--border)] rounded p-2" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-2 border-[var(--border)] rounded p-2" />

                <Button type="submit" className='w-auto mx-auto'>Login</Button>
            </form>
            <div className="flex flex-col gap-2 m-2 text-center">
                <p className="text-red-500 min-h-[2rem]">{error}</p>
                <p>Forgot your password?{" "}
                    <Link href="/chinguverse/auth/forgot-password" className="link">Reset password</Link>
                </p>
                <p>Don&apos;t have an account?{" "}
                    <Link href="/chinguverse/auth/signup" className="link">Sign up</Link>
                </p>
            </div>
        </div>
    );
}