import { Box, Heading, Grid } from "@chakra-ui/react";
import LoadingScreen from "../home/LoadingScreen";
import ProductCards from "../home/ProductCards";

export default function MoreProducts({ load, moreProd, myapi }) {
  const arr = [1, 2, 3, 4, 5];
  return (
    <Box ml={"20px"} display={"block"} margin={"auto"} w={"fit-content"}>
      <Heading mb={"20px"}>People also viewed</Heading>
      <Grid
        templateColumns={{
          base: "repeat(1,220px)",
          sm: "repeat(2,220px)",
          md: "repeat(4,220px)",
          lg: "repeat(5,220px)",
        }}
        gap={"20px"}
      >
        {load
          ? arr.map(() => {
              return <LoadingScreen />;
            })
          : moreProd.map((item, i) => {
              return (
                <ProductCards {...item} api={myapi} key={i} endpoint={"mens"} />
              );
            })}
      </Grid>
    </Box>
  );
}
