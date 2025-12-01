"use client";
import { useEffect, useRef, useState } from "react";
import { Member } from "@/types/member";
import { formatMemberCountry, MemberWithCountryName } from "@/lib/country"
import { useCallback } from "react";
import { SearchFilters } from "@/types/searchFilter";
import { buildQueryString } from "@/lib/useSearchQuery";

interface ApiResponse {
    data: Member[];
}

export function useMembers(scrollRootRef?: React.RefObject<HTMLElement | null>, filters?: SearchFilters) {
    const [members, setMembers] = useState<MemberWithCountryName[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const attemptLockRef = useRef(false);
    const pageRef = useRef<number>(1);
    const isLoadingRef = useRef<boolean>(false);
    const hasMoreRef = useRef<boolean>(true);
    const pageSize = 50;
    const filtersRef = useRef<SearchFilters | undefined>(filters);
    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    const fetchMembers = useCallback(async (currentFilters?: SearchFilters) => {
        if (isLoadingRef.current || !hasMoreRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        try {
            const currentPage = pageRef.current;
            const activeFilters = currentFilters ?? filtersRef.current;
            const filterQuery = activeFilters ? buildQueryString(activeFilters) : "";
            const response = await fetch(
                `/api/members?page=${currentPage}&pageSize=${pageSize}${filterQuery}`
            );
            const json: ApiResponse = await response.json();

            if (!json || !json.data || json.data.length === 0) {
                hasMoreRef.current = false;
                return;
            }
            setMembers((prevMembers) => {
                const combined = [...prevMembers, ...json.data.map(formatMemberCountry)];
                const uniqueMembers = Array.from(new Map(combined.map(m => [m.id, m])).values());
                return uniqueMembers;
            });
            pageRef.current += 1;
            hasMoreRef.current = json.data.length === pageSize;
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
            console.error("Error fetching members:", error);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
            attemptLockRef.current = false;
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        if (!filters) return;
        pageRef.current = 1;
        hasMoreRef.current = true;
        setMembers([]);
        fetchMembers(filters);
    }, [filters, fetchMembers]);

    // IntersectionObserver for infinite scroll
    useEffect(() => {
        const root = scrollRootRef?.current ?? null;
        const target = loaderRef.current;
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isLoadingRef.current && hasMoreRef.current && !attemptLockRef.current) {
                attemptLockRef.current = true;
                fetchMembers();
            }
        }, { root, rootMargin: "400px 0px", threshold: 0.01 });
        observer.observe(target);
        return () => observer.disconnect();
    }, [fetchMembers, scrollRootRef]);

    return { members, isLoading, loaderRef, error, fetchMembers };
}
