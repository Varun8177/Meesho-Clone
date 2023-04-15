import { Box, Image, Badge, Skeleton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function LoadingScreen() {
  return (
    <Skeleton>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        border={"1px solid rgb(223, 223, 223)"}
        cursor={"pointer"}
      >
        <Image
          src={
            "https://images.meesho.com/images/products/137641650/qviyf_400.jpg"
          }
          alt={"load-img"}
          height={{ base: "150px", md: "232px" }}
          margin={"auto"}
          objectFit={"contain"}
        />

        <Box p={{ base: "2", md: "6" }}>
          <Box
            mt="1"
            fontWeight="semibold"
            as={"h4"}
            lineHeight="tight"
            noOfLines={1}
          >
            Fancy Elegant Men Shirts
          </Box>

          <Box fontSize={{ base: "sm", md: "xl" }}>
            ₹590
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
              4.4 >= 4
                ? "rgb(3, 141, 99)"
                : 4.4 > 2
                ? "rgb(244, 182, 25)"
                : "red"
            }
          >
            4.4
            <StarIcon color={"white"} height={"10px"} />
          </Badge>
          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              294 Reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Skeleton>
  );
}
