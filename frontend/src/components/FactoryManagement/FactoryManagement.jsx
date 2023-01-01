import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useContext } from "react";
import { ADMIN_FACILITY_PAGE } from "../../config/pageName";
import { GetDataAPIContext } from "../../stores";
import FactoryList from "./FactoryList";

const FactoryManagement = () => {
  const { getDataAPIState } = useContext(GetDataAPIContext);

  const filterData = (type) => {
    if (
      getDataAPIState.pageName !== ADMIN_FACILITY_PAGE ||
      !getDataAPIState.data
    ) {
      return [];
    }
    let newFactories = getDataAPIState.data.filter((factory) => {
      return factory.type === type;
    });
    return newFactories;
  };

  return (
    <Tabs p={["0", "16px"]} mt={["16px"]}>
      <TabList>
        <Tab>Cơ sở sản xuất</Tab>
        <Tab>Đại lý phân phối</Tab>
        <Tab>Trung tâm bảo hành</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <FactoryList factories={filterData("produce")} />
        </TabPanel>
        <TabPanel>
          <FactoryList factories={filterData("distribute")} />
        </TabPanel>
        <TabPanel>
          <FactoryList factories={filterData("guarantee")} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FactoryManagement;
