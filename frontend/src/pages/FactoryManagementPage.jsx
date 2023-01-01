import { Box, useToast } from "@chakra-ui/react";
import FactoryManagement from "../components/FactoryManagement";
import FactoryManagementTopBar from "../components/FactoryManagementTopBar";
import { useEffect, useContext, useCallback } from "react";
import EditFacility from "../components/EditFacility/EditFacility";
import { getFactoriesAPI } from "../api/factoryApi";
import { GetDataAPIContext } from "../stores";
import { ADMIN_FACILITY_PAGE, CREATE_TYPE } from "../config/pageName";

const FactoryManagementPage = () => {
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);
  const toast = useToast();

  const getFactories = useCallback(async () => {
    const res = await getFactoriesAPI();
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
      payload: { pageName: ADMIN_FACILITY_PAGE, getDataAPI: getFactories },
    });
  }, []);

  return (
    <Box m={["16px"]}>
      <>
        <EditFacility />
        <FactoryManagementTopBar />
        <FactoryManagement />
      </>
    </Box>
  );
};

export default FactoryManagementPage;
