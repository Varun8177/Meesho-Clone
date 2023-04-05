import { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  const [Searchvalue, setSearchvalue] = useState("");
  const handleSearchValue = (val) => {
    setSearchvalue(val);
  };
  return (
    <SearchContext.Provider value={{ Searchvalue, handleSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}
