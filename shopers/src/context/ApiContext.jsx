import { useState } from "react";
import { createContext } from "react";

export const ApiContext = createContext();

export default function ApiContextProvider({ children }) {
  const [api, setApi] = useState("");
  const handleApi = (val) => {
    setApi(val);
  };
  return (
    <ApiContext.Provider value={{ handleApi, api }}>
      {children}
    </ApiContext.Provider>
  );
}
