"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { HeadlineXL } from "@/app/component/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function onSignup(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/"); // Redirect to home page after successful signup
        } catch (error: unknown) {
            setError("Signup failed.\n" + (error as Error).message);
        }
    }
    return (
        <div className="max-w-md mx-auto m-10 p-6">
            <HeadlineXL>Sign Up</HeadlineXL>
            <form onSubmit={onSignup} className="flex flex-col gap-4 mt-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-2 border-[var(--border)] rounded p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-2 border-[var(--border)] rounded p-2"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-2 border-[var(--border)] rounded p-2"
                />
                <Button type="submit" className="w-auto mx-auto">Sign Up</Button>
            </form>
            <div className="flex flex-col gap-2 m-2 text-center">
                <p className="text-red-500 min-h-[2rem] whitespace-pre-line">{error}</p>
                <p>Already have an account?{" "}
                    <Link href="/chinguverse/auth/login" className="link">Login</Link>
                </p>
            </div>
        </div>
    );
}