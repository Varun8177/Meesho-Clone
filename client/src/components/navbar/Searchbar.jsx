import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  const handleSearch = (value) => {
    // Handle search logic
  };
  return (
    <InputGroup
      ml={{ base: "0", md: "2%" }}
      mt={{ base: "5px", md: "0" }}
      alignItems="center"
    >
      <InputLeftElement
        pointerEvents="none"
        children={<IoSearch color="gray" style={{ marginTop: "10px" }} />}
      />
      <Input
        type="search"
        htmlSize={10}
        width={{
          base: "100%",
          lg: "300px",
          xl: "400px",
        }}
        borderRadius="5px"
        h={{ base: "40px", sm: "45px" }}
        borderColor="gray.300"
        focusBorderColor="gray.300"
        placeholder="Try Saree, Kurti, or search by product code"
        _placeholder={{ color: "grey.200" }}
        onChange={(e) => handleSearch(e.target.value)}
        color="black"
      />
    </InputGroup>
  );
};

export default Searchbar;
