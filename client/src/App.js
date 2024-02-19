import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Pages from "./pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {Pages.map((item) => (
          <Route {...item} key={item.path} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
