import { Box, Image, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";

export default function ProductCards({
  images,
  title,
  price,
  id,
  rating,
  reviews,
  api,
  endpoint,
}) {
  const navigate = useNavigate();
  const { handleApi } = useContext(ApiContext);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      border={"1px solid rgb(223, 223, 223)"}
      cursor={"pointer"}
      onClick={() => {
        handleApi(api, endpoint);
        navigate(`/single-prod/${id}`);
      }}
    >
      <Image src={images} alt={id} height={"232px"} margin={"auto"} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>

        <Box fontSize="xl">
          {price}
          <Box as="span" color="gray.600" fontSize="sm">
            /onwards
          </Box>
        </Box>
        <Badge
          borderRadius="full"
          px="2"
          colorScheme="gray"
          mt={"10px"}
          h={"20px"}
          alignItems={"center"}
        >
          Free Delivery
        </Badge>
        <br />
        <Badge
          mt={"15px"}
          borderRadius="full"
          px="2"
          fontSize="md"
          color={"white"}
          bgColor={
            rating >= 4
              ? "rgb(3, 141, 99)"
              : rating > 2
              ? "rgb(244, 182, 25)"
              : "red"
          }
        >
          {rating}
          <StarIcon color={"white"} height={"10px"} />
        </Badge>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {reviews}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
