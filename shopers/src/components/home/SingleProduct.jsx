import { Box, Flex, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";

export default function SingleProduct() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const { api } = useContext(ApiContext);
  const params = useParams();

  const productData = async () => {
    setLoad(true);
    try {
      const product = await axios.get(`${api}/${params.user_id}`);
      setData(product.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    productData();
  }, []);

  console.log(data);
  // console.log(api);
  return (
    <Flex>
      {/* image section */}
      <Box>
        <Image src={data.images} />
      </Box>
    </Flex>
  );
}
