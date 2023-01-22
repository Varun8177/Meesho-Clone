import { Route, Routes } from "react-router-dom";
import Address from "../../pages/Address";
import Admin from "../../pages/Admin";
import Bags from "../../pages/Bags";
import BeautyAndHealthData from "../../pages/BeautyAndHealth";
import Cart from "../../pages/Cart";
import Electronics from "../../pages/Electronics";
import Home from "../../pages/Home";
import HomeAndKitchen from "../../pages/HomeAndKitchen";
import Jewellery from "../../pages/Jewellery";
import Kids from "../../pages/Kids";
import Login from "../../pages/Login";
import Mens from "../../pages/Mens";
import OTP from "../../pages/OTP";
import Payment from "../../pages/Payment";
import Profile from "../../pages/profile";
import Search from "../../pages/Search";
import Signup from "../../pages/Signup";
import WomenEthnic from "../../pages/WomenEthnic";
import WomenWestern from "../../pages/WomenWestern";
import AddAdmin from "../AdminComponents/AddAdmin";
import AddItem from "../AdminComponents/AddItem";
import AdminKids from "../AdminComponents/AdminKids";
import AdminLogin from "../AdminComponents/AdminLogin";
import AdminMens from "../AdminComponents/AdminMens";
import AdminReviews from "../AdminComponents/AdminReviews";
import AdminuserDetails from "../AdminComponents/AdminuserDetails";
import AdminWomen from "../AdminComponents/AdminWomen";
import SingleProduct from "../home/SingleProduct";
import Orders from "../profileComponents/Orders";
import ProfileAddress from "../profileComponents/ProfileAddress";
import Review from "../profileComponents/review";
import UserProfileEdit from "../profileComponents/userProfileEdit";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/women-ethnic" element={<WomenEthnic />} />
      <Route path="/women-western" element={<WomenWestern />} />
      <Route path="/men" element={<Mens />} />
      <Route path="/kids" element={<Kids />} />
      <Route path="/home-&-kitchen" element={<HomeAndKitchen />} />
      <Route path="/beauty-&-health" element={<BeautyAndHealthData />} />
      <Route path="/jewellery-&-accessories" element={<Jewellery />} />
      <Route path="/bags-&-footwear" element={<Bags />} />
      <Route path="/electronics" element={<Electronics />} />
      <Route path="/single-prod/:user_id" element={<SingleProduct />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/otp-page" element={<OTP />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/review" element={<Review />} />
      <Route path="/profile/user-details-edit" element={<UserProfileEdit />} />
      <Route path="/profile/user-orders" element={<Orders />} />
      <Route path="/address" element={<Address />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/profile/address" element={<ProfileAddress />} />
      <Route path="/search-products" element={<Search />} />
      <Route path="/profile/Admin" element={<Admin />} />
      <Route
        path="/profile/Admin/users-joined"
        element={<AdminuserDetails />}
      />
      <Route path="/profile/Admin/reviews" element={<AdminReviews />} />
      <Route path="/profile/Admin/add-product" element={<AddItem />} />
      <Route path="/profile/Admin/mens" element={<AdminMens />} />
      <Route path="/profile/Admin/kids" element={<AdminKids />} />
      <Route path="/profile/Admin/women" element={<AdminWomen />} />
      <Route path="/profile/Admin/create-admin" element={<AddAdmin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
}
