import { createContext, useState } from "react";

export const TotalContext = createContext();

export default function TotalContextProvider({ children }) {
  const [totalcost, setTotal] = useState(0);
  const [address, setaddress] = useState({});
  const [orders, setorders] = useState([]);
  const handleTotalCost = (val) => {
    setTotal(val);
  };
  const handleAddress = (val) => {
    setaddress(val);
  };
  const handleOrders = (val) => {
    setorders(val);
  };
  return (
    <TotalContext.Provider
      value={{
        totalcost,
        handleTotalCost,
        address,
        handleAddress,
        handleOrders,
        orders,
      }}
    >
      {children}
    </TotalContext.Provider>
  );
}
