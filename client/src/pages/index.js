import { Flex, Spinner } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import OTP from "./OTP";
import Address from "./Address";

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
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/products/:category",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Products />
      </Suspense>
    ),
  },
  {
    path: "/product/:productId",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <SingleProduct />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "/payment",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Payment />
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Cart />
      </Suspense>
    ),
  },
  {
    path: "/otp-verification",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <OTP />
      </Suspense>
    ),
  },
  {
    path: "/address",
    element: (
      <Suspense
        fallback={
          <Flex h="70vh" alignItems="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        }
      >
        <Address />
      </Suspense>
    ),
  },
];

export default Pages;
