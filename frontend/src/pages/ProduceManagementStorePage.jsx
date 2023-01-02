import { Box, useToast } from "@chakra-ui/react";
import { GetDataAPIContext } from "../stores";
import {
  ADD_PRODUCT_BTN_TITLE,
  CREATE_TYPE,
  PRODUCE_MANAGEMENT_STORE_TITLE,
  PRODUCE_PRODUCT_PAGE,
} from "../config/pageName";
import { useEffect, useContext, useCallback } from "react";
import { getAllProducts } from "../api/produceApi";
import { ProduceManagementStore } from "../components/ProduceManagementStore";
import PageTopBar from "../components/PageTopBar";
import ProduceFormModal from "../components/ProduceFormModal";

const ProduceManagementStorePage = () => {
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);
  const toast = useToast();

  const getProducts = useCallback(async () => {
    const res = await getAllProducts();
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
        pageName: PRODUCE_PRODUCT_PAGE,
        getDataAPI: getProducts,
      },
    });
  }, []);

  return (
    <Box m={["16px"]}>
      <ProduceFormModal />
      <PageTopBar
        title={PRODUCE_MANAGEMENT_STORE_TITLE}
        btnTitle={ADD_PRODUCT_BTN_TITLE}
      />
      <ProduceManagementStore />
    </Box>
  );
};

export default ProduceManagementStorePage;
