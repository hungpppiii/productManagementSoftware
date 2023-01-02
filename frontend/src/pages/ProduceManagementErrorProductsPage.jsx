import { Box, useToast } from "@chakra-ui/react";
import { GetDataAPIContext } from "../stores";
import {
  CREATE_TYPE,
  PRODUCE_ERROR_PRODUCTS_TITLE,
  PRODUCE_ERROR_PRODUCT_PAGE,
} from "../config/pageName";
import { useEffect, useContext, useCallback } from "react";
import ImportProductLine from "../components/ImportProductLine";
import { getAllErrorProducts } from "../api/produceApi";
import { ProduceManagementErrorProducts } from "../components/ProduceManagementErrorProducts";
import PageTopBar from "../components/PageTopBar";

const ProduceManagementErrorProductsPage = () => {
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);
  const toast = useToast();

  const getErrorProducts = useCallback(async () => {
    const res = await getAllErrorProducts();
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
        pageName: PRODUCE_ERROR_PRODUCT_PAGE,
        getDataAPI: getErrorProducts,
      },
    });
  }, []);

  return (
    <Box m={["16px"]}>
      <ImportProductLine />
      <PageTopBar title={PRODUCE_ERROR_PRODUCTS_TITLE} />
      <ProduceManagementErrorProducts />
    </Box>
  );
};

export default ProduceManagementErrorProductsPage;
