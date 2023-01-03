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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { addProductLine, updateProductLine } from "../../api/productLineApi";
import { HIDDEN_MODAL_FORM } from "../../config/modalFormType";
import { GET_TYPE } from "../../config/pageName";
import { GetDataAPIContext, ModalFormContext } from "../../stores";

const ImportProductLine = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [inputName, setInputName] = useState("");
  const [inputModel, setInputModel] = useState("");
  const [inputGuaranteePeriod, setInputGuaranteePeriod] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const { modalFormState, modalFormDispatch } = useContext(ModalFormContext);
  const { isShowModalForm, type, data } = modalFormState;
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);

  useEffect(() => {
    if (isShowModalForm) {
      onOpen();
      setInputName(data?.name);
      setInputModel(data?.model);
      setInputGuaranteePeriod(data?.guaranteePeriod);
    } else {
      onClose();
    }
  }, [isShowModalForm]);

  useEffect(() => {
    if (!isOpen) {
      modalFormDispatch({ type: HIDDEN_MODAL_FORM });
    }
  }, [isOpen, modalFormDispatch]);

  const saveForm = async () => {
    const newProductLine = {
      name: inputName,
      model: inputModel,
      photoUrl: "",
      guaranteePeriod: inputGuaranteePeriod,
    };
    const res = await (type === "add"
      ? addProductLine(newProductLine)
      : updateProductLine(data?.id, newProductLine));
    if (res.status === 200 || res.status === 201) {
      toast({
        position: "top",
        title:
          type === "edit"
            ? "Chỉnh sửa dòng sản phẩm thành công"
            : "Thêm dòng sản phẩm thành công",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title:
          type === "edit"
            ? "Chỉnh sửa dòng sản phẩm thất bại"
            : "Thêm dòng sản phẩm thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSaveForm = async () => {
    setShowSpinner(true);
    await saveForm();
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
          {type === "add" ? "Thêm dòng sản phẩm" : "Chỉnh sửa dòng sản phẩm"}
        </ModalHeader>
        <ModalCloseButton />
        {showSpinner && (
          <Flex
            pos={"absolute"}
            boxSize={"100%"}
            justify="center"
            align={"center"}
          >
            <Spinner thickness="4px" size={"xl"} speed={"0.6s"} />
          </Flex>
        )}
        <ModalBody>
          <Box m={"0 0 8px"}>Tên</Box>
          <Input
            type={"text"}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <Box m={"16px 0 8px"}>Mã dòng sản phẩm</Box>
          <Input
            type={"text"}
            value={inputModel}
            onChange={(e) => setInputModel(e.target.value)}
          />
          <Box m={"16px 0 8px"}>Thời hạn bảo hành</Box>
          <Input
            required
            value={inputGuaranteePeriod}
            onChange={(e) => setInputGuaranteePeriod(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            w={["100%", "initial"]}
            colorScheme={"blue"}
            mr={6}
            onClick={handleSaveForm}
          >
            Lưu
          </Button>
          <Button w={["100%", "initial"]} onClick={onClose} colorScheme="red">
            Hủy bỏ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImportProductLine;
