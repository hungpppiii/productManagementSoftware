import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { addFactoryAPI, editFactoryAPI } from "../../api/factoryApi";
import { GET_TYPE } from "../../config/pageName";
import { EditFacilityContext, GetDataAPIContext } from "../../stores";

const EditFacility = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [inputName, setInputName] = useState("");
  const [inputAccount, setInputAccount] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [type, setType] = useState("produce");
  const [showSpinner, setShowSpinner] = useState(false);
  const [editFacilityState, editFacilityDispatch] =
    useContext(EditFacilityContext);
  const { isShowEditFacilityModal, typeEditFacility, data } = editFacilityState;
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);

  useEffect(() => {
    if (isShowEditFacilityModal) {
      onOpen();
      setInputName(data?.name);
      setInputAccount(data?.account);
      setInputEmail(data?.email);
      setInputPassword("");
      setType("produce");
    } else {
      onClose();
    }
  }, [isShowEditFacilityModal]);

  useEffect(() => {
    if (!isOpen) {
      editFacilityDispatch({ type: "hiddenEditFacilityModal" });
    }
  }, [isOpen, editFacilityDispatch]);

  const SaveFacility = async () => {
    const newFactory = {
      name: inputName,
      account: inputAccount,
      password: inputPassword,
      email: inputEmail,
      imageUrl: "",
      type: data?.type || type,
    };

    const res = await (typeEditFacility === "edit"
      ? editFactoryAPI(data?.id, newFactory)
      : addFactoryAPI(newFactory));
    if (res.status === 200 || res.status === 201) {
      toast({
        position: "top",
        title:
          typeEditFacility === "edit"
            ? "Ch???nh s???a c?? s??? th??nh c??ng"
            : "Th??m c?? s??? th??nh c??ng",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title:
          typeEditFacility === "edit"
            ? "Ch???nh s???a c?? s??? th???t b???i"
            : "Th??m c?? s??? th???t b???i",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSaveFactory = async () => {
    setShowSpinner(true);
    await SaveFacility();
    setShowSpinner(false);
    getDataAPIDispatch({ type: GET_TYPE });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        pos={"relative"}
        bgColor={"#2d3748"}
        color={"white"}
        m={["80px 24px 0", "80px 24px 0"]}
      >
        <ModalHeader>
          {typeEditFacility === "edit" ? "Ch???nh s???a c?? s???" : "Th??m c?? s???"}
        </ModalHeader>
        <ModalCloseButton />
        {showSpinner && (
          <Flex
            pos={"absolute"}
            boxSize={"100%"}
            justify="center"
            align={"center"}
            zIndex={100}
          >
            <Spinner thickness="4px" size={"xl"} speed={"0.6s"} />
          </Flex>
        )}
        <ModalBody>
          <Box m={"0 0 8px"}>T??n</Box>
          <Input
            type={"text"}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <Box m={"16px 0 8px"}>T??n ????ng nh???p</Box>
          <Input
            type={"text"}
            value={inputAccount}
            onChange={(e) => setInputAccount(e.target.value)}
          />
          <Box m={"16px 0 8px"}>Email</Box>
          <Input
            required
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <Box m={"16px 0 8px"}>M???t kh???u</Box>
          <Input
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          {typeEditFacility === "add" && (
            <>
              <Box m={"16px 0 8px"}>Lo???i</Box>
              <Select
                flex={1}
                borderRadius={"5px"}
                onChange={(e) => setType(e.target.value)}
                bgColor={"#2d3748"}
                mb={"16px"}
              >
                <option style={{ background: "#2d3748" }} value="produce">
                  C?? s??? s???n xu???t
                </option>
                <option style={{ background: "#2d3748" }} value="distribute">
                  ?????i l?? ph??n ph???i
                </option>
                <option style={{ background: "#2d3748" }} value="guarantee">
                  Trung t??m b???o h??nh
                </option>
              </Select>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            w={["100%", "initial"]}
            colorScheme={"blue"}
            mr={6}
            onClick={handleSaveFactory}
          >
            L??u
          </Button>
          <Button w={["100%", "initial"]} onClick={onClose} colorScheme="red">
            H???y b???
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditFacility;
