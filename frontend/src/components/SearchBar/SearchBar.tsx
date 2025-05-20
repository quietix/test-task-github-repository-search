import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  setQuery: (query: string) => void;
}

function SearchBar({  setQuery }: SearchBarProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <input
      className={styles["search-input"]}
      type="text"
      placeholder="Start typing to search..."
      onChange={handleOnChange}
    />
  );
}

export default SearchBar;
