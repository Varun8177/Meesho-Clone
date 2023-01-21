import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/home/Footer';
import Navbar from './components/home/Navbar';
import SingleProduct from './components/home/SingleProduct';
import Review from './components/profileComponents/review';
import UserProfileEdit from './components/profileComponents/userProfileEdit';
import Bags from './pages/Bags';
import BeautyAndHealthData from './pages/BeautyAndHealth';
import Cart from './pages/Cart';
import Electronics from './pages/Electronics';
import Home from './pages/Home';
import HomeAndKitchen from './pages/HomeAndKitchen';
import Jewellery from './pages/Jewellery';
import Kids from './pages/Kids';
import Login from './pages/Login';
import Mens from './pages/Mens';
import OTP from './pages/OTP';
import Profile from './pages/profile';
import Signup from './pages/Signup';
import WomenEthnic from './pages/WomenEthnic';
import WomenWestern from './pages/WomenWestern';

function App() {
  return (
    <div className="App">
      <Navbar />
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
        <Route path='/otp-page' element={<OTP />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/review' element={<Review />} />
        <Route path='/profile/user-details-edit' element={<UserProfileEdit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
