"use client";
import { useEffect, useRef, useState } from "react";
import { Member } from "@/types/member";
import { formatMemberCountry, MemberWithCountryName } from "@/lib/country"

interface ApiResponse {
    data: Member[];
}

export function useMembers(scrollRootRef?: React.RefObject<HTMLElement | null>) {
    const [members, setMembers] = useState<MemberWithCountryName[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const attemptLockRef = useRef(false);
    const pageSize = 50;

    const fetchMembers = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/members?page=${page}&pageSize=${pageSize}`
            );
            const json: ApiResponse = await response.json();

            if (!json || !json.data || json.data.length === 0) {
                setHasMore(false);
                setIsLoading(false);
                return;
            }
            setMembers((prevMembers) => {
                const combined = [...prevMembers, ...json.data.map(formatMemberCountry)];
                const uniqueMembers = Array.from(new Map(combined.map(m => [m.id, m])).values());
                return uniqueMembers;
            });
            setPage((prevPage) => prevPage + 1);
            setHasMore(json.data.length === pageSize);
        } catch (error: any) {
            setError(error.message || "An error occurred");
            console.error("Error fetching members:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchMembers();
    }, []);

    // IntersectionObserver for infinite scroll
    useEffect(() => {
        const root = scrollRootRef?.current ?? null;
        const target = loaderRef.current;
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isLoading && hasMore && !attemptLockRef.current) {
                attemptLockRef.current = true;
                fetchMembers();
            }
        }, { root, rootMargin: "400px 0px", threshold: 0.01 });
        observer.observe(target);
        return () => observer.disconnect();
    }, [isLoading, hasMore, scrollRootRef?.current]);

    useEffect(() => {
        if (!isLoading) {
            attemptLockRef.current = false;
        }
    }, [isLoading]);

    return { members, isLoading, hasMore, loaderRef, error };
}
