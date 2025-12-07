"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { HeadlineXL } from "@/app/component/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [sent, setSent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function onResetPassword(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSent(null);

        try {
            await sendPasswordResetEmail(auth, email);
            setSent("If an account exists for this email, a password reset link has been sent. Please check your inbox.");
        } catch (error: unknown) {
            setError("Forgot Password failed.\n" + (error as Error).message);
        }
    }

    return (
        <div className="max-w-md mx-auto m-10 p-6">
            <HeadlineXL>Reset Password</HeadlineXL>
            <form onSubmit={onResetPassword} className="flex flex-col gap-4 mt-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-2 border-[var(--border)] rounded p-2"
                />
                <p className="min-h-[2rem] text-center">
                    <span className="text-red-500 whitespace-pre-line">{error}</span>
                    <span className="text-green-500">{sent}</span>
                </p>
                <Button type="submit" className="w-auto mx-auto" >
                    Reset Password
                </Button>
            </form>
            <div className="flex flex-col gap-2 m-2 text-center">
                <p>Go back to Login?{" "}
                    <Link href="/chinguverse/auth/login" className="link">Login</Link>
                </p>
            </div>
        </div>
    );
}