import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TotalContext } from "../../context/TotalContext";

export default function Total({ total, data }) {
  const { handleTotalCost, handleOrders } = useContext(TotalContext);
  const login = localStorage.getItem("login");
  const navigate = useNavigate();
  useEffect(() => {
    handleTotalCost(total);
  }, [total, handleTotalCost]);
  return (
    <Box
      // w={["100%", "100%", "300px", "300px"]}
      w={{ base: "100%", lg: "300px" }}
      borderWidth="1px"
      overflow="hidden"
      mt={"20px"}
      pb={"5"}
      ml={{ lg: "10px", xl: "0" }}
      borderLeft={"2px solid rgb(234, 239, 244)"}
    >
      <Box>
        <Box p="26px">
          <Heading fontSize={"xl"} color="rgb(102, 116, 142)">
            Price Details
          </Heading>
        </Box>
        <Stack pl={"26px"} color="rgb(102, 116, 142)" pr={"20px"}>
          <Text>Total Product Price:{total} INR</Text>
          <hr />

          <Heading fontSize={"xl"}>Order Total :{total} INR </Heading>
          <Button
            isDisabled={data.length === 0}
            borderRadius={"5px"}
            width={"100%"}
            _hover={"rgb(255, 0, 0)"}
            bgColor={"rgb(244, 51, 151)"}
            color={"white"}
            onClick={() => {
              if (login === "true") {
                handleOrders(data);
                navigate("/address");
              } else {
                navigate("/login");
              }
            }}
          >
            <Box as="span" marginRight={"10px"}>
              <ArrowForwardIcon />
            </Box>
            {login === "true" ? "Checkout" : "Login"}
          </Button>
          <Image src="https://images.meesho.com/images/marketing/1588578650850.webp" />
        </Stack>
      </Box>
    </Box>
  );
}
