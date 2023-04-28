import { Box, Heading, Grid } from "@chakra-ui/react";
import LoadingScreen from "../home/LoadingScreen";
import ProductCards from "../home/ProductCards";

export default function MoreProducts({ load, moreProd, myapi, endpoint }) {
  const arr = [1, 2, 3, 4, 5];
  return (
    <Box>
      <Heading
        mb={"20px"}
        ml={{ base: "0", md: "40px", xl: "80px" }}
        textAlign={{ base: "center", md: "left" }}
      >
        People also viewed
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={{ base: "15px", md: "20px" }}
        w={{ base: "100%", xl: "90%" }}
        m={"auto"}
      >
        {load
          ? arr.map((item) => {
              return <LoadingScreen key={item + 2132454190} />;
            })
          : moreProd.map((item, i) => {
              return (
                <ProductCards
                  {...item}
                  api={myapi}
                  key={i}
                  endpoint={endpoint}
                />
              );
            })}
      </Grid>
    </Box>
  );
}
