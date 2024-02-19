import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseResponseHandler from "../utils/UseResponseHandler";
import { getCartData } from "../../redux/actions/cartActions";
import SelectAddress from "./SelectAddress";

const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;
const Total = ({ showBtn = true }) => {
  const { total } = useSelector((store) => store.cartReducer);

  const { handleResponse } = UseResponseHandler();
  const dispatch = useDispatch();

  useEffect(() => {
    getCartData(dispatch, handleResponse);
  }, []);

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
      h="fit-content"
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
          {showBtn && <SelectAddress />}

          <Image src={`${CLOUDINARY_BASE_PATH}/knxed2nqefgy2hf7nn0f`} />
        </Stack>
      </Box>
    </Box>
  );
};

export default Total;
