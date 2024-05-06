import SearchSVG from "./searchSVG";
import styles from "./searchInput.module.css";
import { ChangeEvent } from "react";

const SearchInput = ({
  value,
  handleSearch,
}: {
  value: string;
  handleSearch: (value: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        id="search-input"
        placeholder="Search..."
        value={value}
        onChange={handleSearch}
      />
      <label className={styles.searchIcon} htmlFor="search-input">
        <SearchSVG />
      </label>
    </div>
  );
};

export default SearchInput;
