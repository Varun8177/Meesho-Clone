import { useState } from "react";
import { createContext } from "react";

export const OTPcontext = createContext();

export default function OTPcontextProvider({ children }) {
  const [otp, setOtp] = useState("");
  const manageOTP = (val) => {
    setOtp(val);
  };
  return (
    <OTPcontext.Provider value={{ manageOTP, otp }}>
      {children}
    </OTPcontext.Provider>
  );
}
