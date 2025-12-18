import type { Article } from "@/types/Article";

export type NewsResult = {
    results: Article[]
    date: string | null;
    prev_date: string | null;
    next_date: string | null;
}