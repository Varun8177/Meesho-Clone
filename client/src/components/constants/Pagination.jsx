import { Button, Flex, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ activePage = 1, totalPages, handlePageChange }) => {
  const [searchparams, setSearchparams] = useSearchParams();
  const pageParam = searchparams.get("page");
  const [pagesArray, setPagesArray] = useState([]);

  let minLenth = 10;

  const handlePage = (pageNumber) => {
    searchparams.set("page", pageNumber);
    setSearchparams(searchparams);
    if (totalPages > 10) {
      console.log(totalPages);
      const index = pagesArray.findIndex((item) => item === pageNumber);

      if (index > 6) {
        const temp = pagesArray.slice(index, index + minLenth);

        const nextFiveElements = new Array(10 - temp.length)
          .fill(0)
          .map((_, i) => temp[temp.length - 1] + (i + 1))
          .filter((val) => val <= totalPages);

        setPagesArray([...temp, ...nextFiveElements]);
      }

      if (index < 3) {
        const length = Math.min(pageNumber - 1, 5);

        let temp = pagesArray.slice(index, index + minLenth);

        const prevousFiveElements = new Array(length)
          .fill(0)
          .map((_, i) => temp[0] - (i + 1))
          .reverse();

        const newPagesArray = [...prevousFiveElements, ...temp].filter(
          (_, i) => i < 10
        );

        setPagesArray(newPagesArray);
      }
    }

    handlePageChange(pageNumber);
  };

  const createArray = (length) => {
    const start = activePage < 10 ? 1 : activePage;
    const newArray = new Array(Math.min(minLenth, length)).fill(0);
    const temp = newArray.map((_, i) => i + start);
    return temp;
  };

  useEffect(() => {
    const temp = createArray(totalPages);
    setPagesArray(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  return (
    <Flex gap={4}>
      <IconButton
        bgColor="#919EAB"
        _hover={{ bgColor: "#919EAB" }}
        icon={<FaChevronLeft color="#C4CDD5" />}
        size="sm"
        onClick={() => handlePage(activePage - 1)}
        isDisabled={activePage === 1}
      />
      {pagesArray.map((item, i) => (
        <Button
          key={`page-${item}`}
          size="sm"
          bg="white"
          borderWidth={"2px"}
          borderStyle="solid"
          _active={{
            borderColor: "rgb(244, 51, 151)",
            color: "rgb(244, 51, 151)",
          }}
          borderColor="#DFE3E8"
          onClick={() => handlePage(item)}
          isActive={item === activePage}
        >
          {item}
        </Button>
      ))}
      <IconButton
        bgColor="#919EAB"
        _hover={{ bgColor: "#919EAB" }}
        icon={<FaChevronRight color="#C4CDD5" />}
        size="sm"
        onClick={() => handlePage(activePage + 1)}
        isDisabled={pagesArray.includes(totalPages)}
      />
    </Flex>
  );
};

export default Pagination;
