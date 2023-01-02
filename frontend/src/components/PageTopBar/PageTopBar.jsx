import { Flex, Heading, Button, Icon } from "@chakra-ui/react";
import { useContext } from "react";
import { HiPlus } from "react-icons/hi";
import { SHOW_MODAL_FORM } from "../../config/modalFormType";
import { ADD_TYPE } from "../../config/pageName";
import { ModalFormContext } from "../../stores";

const PageTopBar = ({ title, btnTitle }) => {
  const { modalFormDispatch } = useContext(ModalFormContext);
  const handleClickAddFacility = () => {
    modalFormDispatch({
      type: SHOW_MODAL_FORM,
      payload: { type: ADD_TYPE },
    });
  };

  return (
    <Flex wrap={["wrap", "nowrap"]} justify={"space-between"} align={"center"}>
      <Heading flex={["100%", "none"]} mb={["8px", 0]} fontSize={"1.5rem"}>
        {title}
      </Heading>
      {btnTitle && (
        <Button
          flex={["100%", "none"]}
          leftIcon={<Icon color={"white"} as={HiPlus} fontSize={"1.5rem"} />}
          // colorScheme={"blue"}
          // color={"white"}
          variant={"solid"}
          onClick={handleClickAddFacility}
        >
          {btnTitle}
        </Button>
      )}
    </Flex>
  );
};

export default PageTopBar;
