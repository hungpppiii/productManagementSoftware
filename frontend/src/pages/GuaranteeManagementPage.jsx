import { Box, useToast } from "@chakra-ui/react";
import EditFacility from "../components/EditFacility";
import GuaranteeManagement from "../components/GuaranteeManagement";
import { GetDataAPIContext } from "../stores";
import {
  CREATE_TYPE,
  GUARANTEE_MANAGEMENT_PRODUCTS_TITLE,
  GUARANTEE_PRODUCT_PAGE,
} from "../config/pageName";
import { useEffect, useContext, useCallback } from "react";
import { getGuaranteeProductsAPI } from "../api/guaranteeAPI";
import PageTopBar from "../components/PageTopBar";

const GuaranteeManagementPage = () => {
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);
  const toast = useToast();

  const getGuaranteeProducts = useCallback(async () => {
    const res = await getGuaranteeProductsAPI();
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
        pageName: GUARANTEE_PRODUCT_PAGE,
        getDataAPI: getGuaranteeProducts,
      },
    });
  }, []);

  return (
    <Box m={["16px"]}>
      <EditFacility />
      <PageTopBar title={GUARANTEE_MANAGEMENT_PRODUCTS_TITLE} />
      <GuaranteeManagement />
    </Box>
  );
};

export default GuaranteeManagementPage;
