import { lazy } from "react";
import OTP from "./OTP";
import Address from "./Address";
import CreateProduct from "./CreateProduct";

const Home = lazy(() => import("./Home"));
const Products = lazy(() => import("./Products"));
const SingleProduct = lazy(() => import("./SingleProduct"));
const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));
const Profile = lazy(() => import("./Profile"));
const Payment = lazy(() => import("./Payment"));
const Cart = lazy(() => import("./Cart"));

const Pages = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/:productId",
    element: <SingleProduct />,
  },
  {
    path: "/create-product",
    element: <CreateProduct />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/otp-verification",
    element: <OTP />,
  },
  {
    path: "/address",
    element: <Address />,
  },
];

export default Pages;
