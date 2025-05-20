import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { setCacheEntry } from "./store/cacheSlice";
import { useState } from "react";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

type SearchType = "users" | "repositories" | "issues";

export function useSearch() {
  const dispatch = useDispatch();
  const cache = useSelector((state: RootState) => state.cache);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearResults = () => {
    setResults([]);
  };

  const fetchResults = async (searchText: string, searchType: SearchType) => {
    setLoading(true);
    clearResults();
    setError(null);

    const key = `${searchType}:${searchText}`;
    const cached = cache[key];

    if (cached) {
      setResults(cached);
      setLoading(false);
      return;
    }

    try {
      const url = new URL(BACKEND_API_URL);
      url.searchParams.append("search_type", searchType);
      url.searchParams.append("search_text", searchText);

      const response = await fetch(url.toString(), {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setResults(data.items || []);
      dispatch(setCacheEntry({ key, data: data.items }));
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, fetchResults, clearResults };
}
