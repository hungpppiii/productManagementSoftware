import { Box, useToast } from "@chakra-ui/react";
import { GetDataAPIContext } from "../stores";
import { ADMIN_PRODUCT_LINE_PAGE, CREATE_TYPE } from "../config/pageName";
import { useEffect, useContext, useCallback } from "react";
import { getProductLinesAPI } from "../api/productLineApi";
import {
  ProductLinesManagement,
  ProductLinesManagementTopBar,
} from "../components/ProductLineManagement";

const ProductLinesManagementPage = () => {
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);
  const toast = useToast();

  const getProductLines = useCallback(async () => {
    const res = await getProductLinesAPI();
    if (res.status === 200) {
      return res.data;
    } else {
      toast({
        position: "top",
        title: "Fetch data failed",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, []);

  useEffect(() => {
    getDataAPIDispatch({
      type: CREATE_TYPE,
      payload: {
        pageName: ADMIN_PRODUCT_LINE_PAGE,
        getDataAPI: getProductLines,
      },
    });
  }, []);

  return (
    <Box m={["16px"]}>
      <ProductLinesManagementTopBar />
      <ProductLinesManagement />
    </Box>
  );
};

export default ProductLinesManagementPage;
