import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import SearchBar from "./components/SearchBar/SearchBar";
import Dropdown from "./components/Dropdown/Dropdown";
import RepoContainer from "./components/ReposContainer/ReposContainer";
import UserContainer from "./components/UsersContainer/UsersContainer";
import IssueContainer from "./components/IssuesContainer/IssueContainer";
import { useSearch } from "./hooks";
import type { SearchType } from "./types";
import styles from "./App.module.scss";

function App() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("users");
  const { results, loading, error, fetchResults, clearResults } = useSearch();

  useEffect(() => {
    const debouncedFetch = debounce((q: string, type: SearchType) => {
      if (q.length >= 3) {
        fetchResults(q, type);
      } else {
        clearResults();
      }
    }, 500);

    debouncedFetch(query, searchType);

    return () => {
      debouncedFetch.cancel();
    };
  }, [query, searchType]);

  const renderResults = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className={styles["error-text"]}>{error}</p>;

    if (query.length > 3 && results.length > 0) {
      switch (searchType) {
        case "users":
          return <UserContainer users={results} />;
        case "repositories":
          return <RepoContainer repos={results} />;
        case "issues":
          return <IssueContainer issues={results} />;
        default:
          return null;
      }
    } else if (query.length > 3) {
      return <p>No results found.</p>;
    }
  };

  return (
    <div className={styles["app-container"]}>
      <div className={styles["info-container"]}>
        <img
          className={styles["logo"]}
          src="/github-mark.svg"
          alt="github-logo"
        />
        <div className={styles["label-container"]}>
          <div className={styles["title"]}>GitHub Searcher</div>
          <div className={styles["description"]}>
            Search users, repositories, or issues below
          </div>
        </div>
      </div>
      <div className={styles["search-area"]}>
        <SearchBar query={query} setQuery={setQuery} />
        <Dropdown setSearchType={setSearchType} />
      </div>

      {renderResults()}
    </div>
  );
}

export default App;
