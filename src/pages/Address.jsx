import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { TotalContext } from "../context/TotalContext";
import { LinkIcon, PhoneIcon } from "@chakra-ui/icons";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/home/Navbar";
import { FaMagic } from "react-icons/fa";

const initialState = {
  name: "",
  mobile: "",
  house: "",
  area: "",
  pincode: "",
  city: "",
  country: "",
  location: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "mobile": {
      return {
        ...state,
        mobile: action.payload,
      };
    }
    case "name": {
      return {
        ...state,
        name: action.payload,
      };
    }
    case "house": {
      return {
        ...state,
        house: action.payload,
      };
    }

    case "area": {
      return {
        ...state,
        area: action.payload,
      };
    }
    case "pincode": {
      return {
        ...state,
        pincode: action.payload,
      };
    }
    case "city": {
      return {
        ...state,
        city: action.payload,
      };
    }
    case "country": {
      return {
        ...state,
        country: action.payload,
      };
    }
    case "location": {
      return {
        ...state,
        location: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default function Address() {
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { handleAddress } = useContext(TotalContext);
  const toast = useToast();
  const { totalcost } = useContext(TotalContext);
  const id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  function getReq(id) {
    axios
      .get(`https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}`)
      .then((res) => {
        setData(res.data);
      });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      setLoad(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get the latitude and longitude from the geolocation API
          const { latitude, longitude } = position.coords;

          // Call an API to get the city name using the latitude and longitude
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                // Set the state name
                console.log("location", data);
                setLoad(false);
                setLocation(data);
              } else {
                console.error("not found");
                setLoad(false);
              }
            })
            .catch((error) => {
              setLoad(false);
              console.error(error);
            });
        },
        (error) => {
          setLoad(false);
          console.error(error);
        }
      );
    } else {
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    getReq(id);
  }, [id]);

  return (
    <Box>
      <Navbar />
      <Box w={{ md: "90%", xl: "70%" }} m={"auto"}>
        <Heading textAlign={{ base: "center", lg: "left" }}>Address</Heading>
        <Flex
          justifyContent={"space-between"}
          m={"auto"}
          direction={{
            base: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
        >
          <Box
            w={["100%", "100%", "750px", "750px"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={"20px"}
            p={"45px"}
          >
            {/* contact Input */}
            <Heading fontSize={"lg"} mb={"20px"}>
              <PhoneIcon /> Contact Details
            </Heading>
            <FormControl isRequired>
              <Input
                type="text"
                placeholder="Name"
                mb={"25px"}
                borderTop={"0"}
                borderRight={"0"}
                borderLeft={"0"}
                borderRadius={"0"}
                disabled
                value={data.name}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="number"
                placeholder="Phone Number"
                mb={"25px"}
                borderTop={"0"}
                borderRight={"0"}
                borderLeft={"0"}
                borderRadius={"0"}
                disabled
                value={data.mobile}
              />
            </FormControl>

            {/* Address input */}

            <Heading fontSize={"lg"} mb={"20px"}>
              <Flex>
                <Box>
                  <LinkIcon /> Address
                </Box>
                <Button
                  ml={"auto"}
                  size="sm"
                  leftIcon={<FaMagic />}
                  variant="outline"
                  _hover={{
                    borderColor: "grey.500",
                    color: "black",
                  }}
                  onClick={() => {
                    console.log("countru", location.address.country);
                    dispatch({
                      type: "country",
                      payload: location.address.country,
                    });
                    dispatch({
                      type: "pincode",
                      payload: location.address.postcode,
                    });
                    dispatch({
                      type: "city",
                      payload: location.address.county,
                    });
                    dispatch({ type: "area", payload: location.display_name });
                  }}
                  isDisabled={load}
                >
                  Autofill
                </Button>
              </Flex>
            </Heading>

            <FormControl isRequired>
              <Input
                type="text"
                placeholder="House no . / Building Name"
                mb={"25px"}
                borderTop={"0"}
                borderRight={"0"}
                borderLeft={"0"}
                borderRadius={"0"}
                value={state.house}
                onChange={(e) =>
                  dispatch({ type: "house", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="text"
                placeholder="Road Name / area / colony"
                mb={"25px"}
                borderTop={"0"}
                borderRight={"0"}
                borderLeft={"0"}
                borderRadius={"0"}
                value={state.area}
                onChange={(e) =>
                  dispatch({ type: "area", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="number"
                placeholder="Pincode"
                mb={"25px"}
                borderTop={"0"}
                borderRight={"0"}
                borderLeft={"0"}
                borderRadius={"0"}
                value={state.pincode}
                onChange={(e) =>
                  dispatch({ type: "pincode", payload: e.target.value })
                }
              />
            </FormControl>
            <Flex justifyContent={"space-between"}>
              <FormControl isRequired>
                <Input
                  width={"90%"}
                  type="text"
                  placeholder="City"
                  mb={"25px"}
                  borderTop={"0"}
                  borderRight={"0"}
                  borderLeft={"0"}
                  borderRadius={"0"}
                  value={state.city}
                  onChange={(e) =>
                    dispatch({ type: "city", payload: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  width={"90%"}
                  type="text"
                  placeholder="Country"
                  mb={"25px"}
                  borderTop={"0"}
                  borderRight={"0"}
                  borderLeft={"0"}
                  borderRadius={"0"}
                  value={state.country}
                  onChange={(e) =>
                    dispatch({ type: "country", payload: e.target.value })
                  }
                />
              </FormControl>
            </Flex>
            <FormControl isRequired>
              <Input
                type="text"
                placeholder="Nearby Location (optional)"
                mb={"25px"}
                borderTop={"0"}
                borderRight={"0"}
                borderLeft={"0"}
                borderRadius={"0"}
                onChange={(e) =>
                  dispatch({ type: "location", payload: e.target.value })
                }
              />
            </FormControl>
            <Button
              textAlign={"center"}
              bgColor="rgb(244, 51, 151)"
              variant="outline"
              color={"white"}
              width={"100%"}
              _hover={{ bg: "rgb(199, 60, 157)" }}
              isDisabled={
                state.country === "" ||
                state.city === "" ||
                state.pincode === "" ||
                state.area === "" ||
                state.house === ""
              }
              onMouseEnter={() => {
                dispatch({ type: "name", payload: data.name });
                dispatch({ type: "mobile", payload: data.mobile });
              }}
              onClick={() => {
                toast({
                  title: "Succesfully saved address",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                handleAddress(state);
                navigate("/payment");
              }}
            >
              Save Address And Continue
            </Button>
          </Box>

          <Box
            w={{ base: "100%", lg: "300px" }}
            borderWidth="1px"
            overflow="hidden"
            pb={"5"}
            borderLeft={"2px solid rgb(234, 239, 244)"}
            mt={"20px"}
            // m={"auto"}
            ml={{ lg: "10px" }}
          >
            <Box>
              <Box p="26px">
                <Heading fontSize={"xl"} color="rgb(102, 116, 142)">
                  Price Details
                </Heading>
              </Box>
              <Stack pl={"26px"} color="rgb(102, 116, 142)" pr={"20px"}>
                <Text>Total Product Price:{totalcost} INR</Text>
                <hr />

                <Heading fontSize={"xl"}>Order Total :{totalcost} INR </Heading>
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
