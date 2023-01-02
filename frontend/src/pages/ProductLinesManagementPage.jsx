import { Box, useToast } from "@chakra-ui/react";
import { GetDataAPIContext } from "../stores";
import {
  ADD_PRODUCT_LINE_BTN_TITLE,
  ADMIN_PRODUCT_LINE_PAGE,
  CREATE_TYPE,
  PRODUCT_LINE_TOP_BAR_TITLE,
} from "../config/pageName";
import { useEffect, useContext, useCallback } from "react";
import { getProductLinesAPI } from "../api/productLineApi";
import { ProductLinesManagement } from "../components/ProductLineManagement";
import ImportProductLine from "../components/ImportProductLine";
import PageTopBar from "../components/PageTopBar";

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
      <ImportProductLine />
      <PageTopBar
        title={PRODUCT_LINE_TOP_BAR_TITLE}
        btnTitle={ADD_PRODUCT_LINE_BTN_TITLE}
      />
      <ProductLinesManagement />
    </Box>
  );
};

export default ProductLinesManagementPage;
