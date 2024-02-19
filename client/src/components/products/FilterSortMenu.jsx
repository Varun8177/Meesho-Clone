import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";

const SortFilterOption = ({ label, onClick, hoverStyles }) => {
  return (
    <>
      <Text
        onClick={onClick}
        p="5"
        _hover={{
          cursor: "pointer",
          ...hoverStyles,
        }}
      >
        {label}
      </Text>
    </>
  );
};

const FilterSortMenu = ({
  value = "",
  handleClick = () => {},
  options = [],
  label = "",
}) => {
  return (
    <Box
      pos={{ base: "initial", sm: "sticky", md: "sticky", lg: "sticky" }}
      top={{ base: "0", sm: "0", md: "150", lg: "130" }}
      w={{ base: "auto", md: "316px" }}
    >
      <Box
        border="1px solid rgb(240, 240, 240)"
        p="5px 10px 5px 10px"
        mb="20px"
        borderRadius="8px"
        h="fit-content"
      >
        <Accordion
          allowMultiple
          w={{ base: "auto", md: "316px" }}
          m={{ md: 0, base: "auto" }}
        >
          <AccordionItem border="0">
            <h2>
              <AccordionButton
                _hover={{
                  background: "transparent",
                  color: "#718096",
                }}
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                }}
                _expanded={{
                  background: "transparent",
                  color: "#718096",
                }}
              >
                <Box as="span" flex="1" textAlign="left" fontSize="xl">
                  {label}: {value}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {options.map((option, i) => (
                <div key={i}>
                  <SortFilterOption
                    label={option.label}
                    onClick={() => handleClick(option.value)}
                    hoverStyles={option.hoverStyles}
                  />
                  {i < options.length - 1 ? <hr /> : null}
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default FilterSortMenu;
