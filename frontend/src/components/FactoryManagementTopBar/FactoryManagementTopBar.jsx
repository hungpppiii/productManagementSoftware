import { Flex, Heading, Button, Icon } from "@chakra-ui/react";
import { useContext } from "react";
import { HiPlus } from "react-icons/hi";
import { EditFacilityContext } from "../../stores/editFacilityStore";

const FactoryManagementTopBar = () => {
  const editFacilityDispatch = useContext(EditFacilityContext)[1];
  const handleClickAddFacility = () => {
    editFacilityDispatch({
      type: "showEditFacilityModal",
      payload: { typeEditFacility: "add" },
    });
  };

  return (
    <Flex wrap={["wrap", "nowrap"]} justify={"space-between"} align={"center"}>
      <Heading flex={["100%", "none"]} mb={["8px", 0]} fontSize={"1.5rem"}>
        Quản lý danh sách cơ sở
      </Heading>
      <Button
        flex={["100%", "none"]}
        leftIcon={<Icon color={"white"} as={HiPlus} fontSize={"1.5rem"} />}
        // colorScheme={"blue"}
        // color={"white"}
        variant={"solid"}
        onClick={handleClickAddFacility}
      >
        Thêm cơ sở
      </Button>
    </Flex>
  );
};

export default FactoryManagementTopBar;
