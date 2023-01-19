import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/home/Navbar';
import SingleProduct from './components/home/SingleProduct';
import Bags from './pages/Bags';
import BeautyAndHealthData from './pages/BeautyAndHealth';
import Electronics from './pages/Electronics';
import Home from './pages/Home';
import HomeAndKitchen from './pages/HomeAndKitchen';
import Jewellery from './pages/Jewellery';
import Kids from './pages/Kids';
import Mens from './pages/Mens';
import Signup from './pages/Signup';
import WomenEthnic from './pages/WomenEthnic';
import WomenWestern from './pages/WomenWestern';

function App() {
  return (
    <div className="App">
      <Navbar />;
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/women-ethnic' element={<WomenEthnic />} />
        <Route path='/women-western' element={<WomenWestern />} />
        <Route path='/men' element={<Mens />} />
        <Route path='/kids' element={<Kids />} />
        <Route path='/home-&-kitchen' element={<HomeAndKitchen />} />
        <Route path='/beauty-&-health' element={<BeautyAndHealthData />} />
        <Route path='/jewellery-&-accessories' element={<Jewellery />} />
        <Route path='/bags-&-footwear' element={<Bags />} />
        <Route path='/electronics' element={<Electronics />} />
        <Route path='/single-prod/:user_id' element={<SingleProduct />} />
        <Route path='/sign-up' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
