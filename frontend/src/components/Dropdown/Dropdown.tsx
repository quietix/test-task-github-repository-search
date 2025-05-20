import type { SearchType } from "../../types";
import styles from "./Dropdown.module.scss";

const dropdownValues: [string] = import.meta.env.VITE_DROPDOWN_OPTIONS?.split(
  ","
);

interface DropdownProps {
  setSearchType: (searchType: SearchType) => void;
}

function Dropdown({ setSearchType }: DropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as SearchType);
  }

  return (
    <select className={styles["dropdown"]} onChange={handleChange}>
      {dropdownValues.map((value, index) => (
        <option key={index} value={value.toLowerCase()}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
