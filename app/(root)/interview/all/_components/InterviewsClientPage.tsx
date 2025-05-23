'use client';

import React, { useEffect, useState, useMemo } from 'react';
import InterviewFilter from './interview-filter';
import InterviewList from './interview-list';
import InterviewPagination from './interviewPagination';
import { getAllInterviews } from '@/lib/actions/general.action';
import type { Interview } from '@/types/profile';

const ITEMS_PER_PAGE = 6;

function useDebouncedValue(value: string, delay: number = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}

export default function InterviewsClientPage() {
    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [companyFilter, setCompanyFilter] = useState<string[] | null>(null);
    const [levelFilter, setLevelFilter] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [technologyFilter, setTechnologyFilter] = useState<string[] | null>(null);
    const [interviewTypeFilter, setInterviewTypeFilter] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllInterviews();
                setInterviews(data || []);
            } catch (error) {
                console.error("Failed to fetch interviews:", error);
                setInterviews([]); // or show a fallback UI
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, companyFilter, levelFilter, technologyFilter, interviewTypeFilter, categoryFilter, debouncedSearchQuery]);


    // All filters combined in a memoized function
    const filtered = useMemo(() => {
        return interviews.filter((i) => {
            const matchStatus =
                statusFilter === null ||
                (i.completed ? 'completed' : 'pending') === statusFilter;

            // Company filter: if no company selected or interview company in selected companies
            const matchCompany =
                companyFilter === null ||
                companyFilter.length === 0 ||
                (i.company &&
                    companyFilter.some(
                        (company) => company.toLowerCase() === i.company?.toLowerCase()
                    ));

            // Interview level filter: if no level selected or interview level in selected levels
            const matchLevel =
                levelFilter === null || i.level?.toLowerCase() === levelFilter.toLowerCase();

            // Category filter: if no category selected or interview category in selected categories
            const matchCategory =
                categoryFilter === null || i?.category?.toLowerCase() === categoryFilter.toLowerCase();

            // Technology filter: check if any selected tech matches interview's techStack
            const matchTechStack =
                technologyFilter === null ||
                technologyFilter.length === 0 ||
                (Array.isArray(i.techStack) &&
                    technologyFilter.some((tech) =>
                        i.techStack.some(
                            (stack) =>
                                typeof stack === "string" &&
                                stack.toLowerCase().includes(tech.toLowerCase())
                        )
                    ));

            const matchInterviewType =
                interviewTypeFilter === null ||
                (i?.type.toLowerCase() === interviewTypeFilter?.toLowerCase());

            const query = debouncedSearchQuery.toLowerCase().trim();
            const matchSearch =
                query === '' ||
                i.title?.toLowerCase().includes(query) ||
                i.category?.toLowerCase().includes(query) ||
                i.description?.toLowerCase().includes(query) ||
                i.level?.toLowerCase().includes(query) ||
                i.type?.toLowerCase().includes(query) ||
                (i.techStack &&
                    i.techStack.some(
                        (stack) =>
                            typeof stack === 'string' &&
                            stack.toLowerCase().includes(query)
                    ));

            return matchStatus && matchCompany && matchLevel && matchTechStack && matchInterviewType && matchSearch && matchCategory;
        });
    }, [interviews, statusFilter, companyFilter, levelFilter, technologyFilter, interviewTypeFilter, debouncedSearchQuery, categoryFilter]);

    const paginatedInterviews = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filtered.slice(start, start + ITEMS_PER_PAGE);
    }, [filtered, currentPage]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Available Interviews</h1>

            <InterviewFilter
                activeStatus={statusFilter}
                onStatusChange={setStatusFilter}
                onCompanyChange={(vals) => setCompanyFilter(vals?.length === 0 ? null : vals)}
                onLevelChange={setLevelFilter}
                onTechnologyChange={(vals) => setTechnologyFilter(vals?.length === 0 ? null : vals)}
                onInterviewTypeChange={setInterviewTypeFilter}
                onSearchChange={setSearchQuery}
                onCategoryChange={setCategoryFilter}
            />

            <InterviewList interviews={paginatedInterviews} />

            <InterviewPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
