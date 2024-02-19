import React from "react";
import { Flex, Heading, Image, Show } from "@chakra-ui/react";

const CategoryPoster = () => {
  const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;
  const postersImages = [
    "ed8a14bmpycbwuqyxjd1",
    "tghs77vg2xxgoykdjsp0",
    "oyxupbiaxfzm2xsrearv",
  ];
  const headingStyles = {
    fontSize: "3xl",
    margin: "auto",
    width: "fit-content",
    marginBottom: "20px",
  };

  const imageStyles = {
    base: "100px",
    sm: "150px",
    md: "200px",
    lg: "300px",
    xl: "400px",
  };

  const imageStyles2 = {
    base: "100px",
    sm: "150px",
    md: "200px",
    lg: "300px",
    xl: "250px",
  };

  return (
    <div>
      <Show above="lg">
        <Heading {...headingStyles}>Top Categories to choose from</Heading>
      </Show>
      <Flex
        mb="30px"
        w={{ base: "100%", md: "100%", lg: "100%", xl: "80%" }}
        m="auto"
        bgImage={{
          base: `${CLOUDINARY_BASE_PATH}/wygc7xorefacsegbmod8`,
          xl: `${CLOUDINARY_BASE_PATH}/xxeuutrpbnefdlxcjtcq`,
        }}
        overflow="hidden"
        alignItems="baseline"
        pt="5"
        pb="5"
      >
        {postersImages.map((imagePath, index) => (
          <Image
            key={index}
            h={index === 0 ? imageStyles : imageStyles2}
            w="50%"
            src={`${CLOUDINARY_BASE_PATH}/${imagePath}`}
            mb={{ base: "20px", md: "0" }}
            objectFit="contain"
          />
        ))}
      </Flex>
    </div>
  );
};

export default CategoryPoster;
