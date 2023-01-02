import { Box, useToast } from "@chakra-ui/react";
import { GetDataAPIContext } from "../stores";
import {
  CREATE_TYPE,
  DISTRIBUTE_PRODUCT_PAGE,
  PRODUCE_MANAGEMENT_STORE_TITLE,
} from "../config/pageName";
import { useEffect, useContext, useCallback } from "react";
import PageTopBar from "../components/PageTopBar";
import { getAllProductsDtbAPI } from "../api/distributeApi";
import DistributeManagementStore from "../components/DistributeManagementStore/DistributeManagementStore";
import DistributeFormModal from "../components/DistributeFormModal";

const DistributeManagementStorePage = () => {
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);
  const toast = useToast();

  const getAllProducts = useCallback(async () => {
    const res = await getAllProductsDtbAPI();
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
        pageName: DISTRIBUTE_PRODUCT_PAGE,
        getDataAPI: getAllProducts,
      },
    });
  }, []);

  return (
    <Box m={["16px"]}>
      <DistributeFormModal />
      <PageTopBar title={PRODUCE_MANAGEMENT_STORE_TITLE} />
      <DistributeManagementStore />
    </Box>
  );
};

export default DistributeManagementStorePage;
