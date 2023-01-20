import { useState } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";

export const ApiContext = createContext();

export default function ApiContextProvider({ children }) {
  const [api, setApi] = useState("");
  const [category, setEndpoint] = useState("");
  const params = useParams();
  console.log("params", params);

  const handleApi = (val, endpoint) => {
    setApi(val);
    setEndpoint(endpoint);
    sessionStorage.setItem("api", val);
  };

  return (
    <ApiContext.Provider value={{ handleApi, api }}>
      {children}
    </ApiContext.Provider>
  );
}
