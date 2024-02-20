import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Pages from "./pages";
import { Suspense } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

function App() {
  const location = useLocation();
  const excludedPaths = [
    "/login",
    "/sign-up",
    "/address",
    "/otp-verification",
    "/payment",
  ];
  return (
    <div className="App">
      {!excludedPaths.includes(location.pathname) ? <Navbar /> : null}
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Routes>
          {Pages.map((item) => (
            <Route {...item} key={item.path} />
          ))}
        </Routes>
      </Suspense>
      {!excludedPaths.includes(location.pathname) ? <Footer /> : null}
    </div>
  );
}

export default App;
