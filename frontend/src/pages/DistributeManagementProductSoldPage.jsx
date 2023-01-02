import { Box, useToast } from "@chakra-ui/react";
import { GetDataAPIContext } from "../stores";
import {
  CREATE_TYPE,
  DISTRIBUTE_PRODUCT_SOLD_PAGE,
  DISTRIBUTE_PRODUCT_SOLD_TITLE,
} from "../config/pageName";
import { useEffect, useContext, useCallback } from "react";
import PageTopBar from "../components/PageTopBar";
import { getAllProductsSoldDtbAPI } from "../api/distributeApi";
import DistributeManagementProductSold from "../components/DistributeManagementProductSold/DistributeManagementProductSold";
import DistributeFormModal from "../components/DistributeFormModal";

const DistributeManagementProductSoldPage = () => {
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);
  const toast = useToast();

  const getAllProducts = useCallback(async () => {
    const res = await getAllProductsSoldDtbAPI();
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
        pageName: DISTRIBUTE_PRODUCT_SOLD_PAGE,
        getDataAPI: getAllProducts,
      },
    });
  }, []);

  return (
    <Box m={["16px"]}>
      <DistributeFormModal />
      <PageTopBar title={DISTRIBUTE_PRODUCT_SOLD_TITLE} />
      <DistributeManagementProductSold />
    </Box>
  );
};

export default DistributeManagementProductSoldPage;
