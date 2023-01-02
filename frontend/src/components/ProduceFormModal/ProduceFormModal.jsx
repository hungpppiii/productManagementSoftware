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
import { exportProducts, importProduct } from "../../api/produceApi";
import { HIDDEN_MODAL_FORM } from "../../config/modalFormType";
import { ADD_TYPE, GET_TYPE } from "../../config/pageName";
import { GetDataAPIContext, ModalFormContext } from "../../stores";

const ProduceFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [input, setInput] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const { modalFormState, modalFormDispatch } = useContext(ModalFormContext);
  const { isShowModalForm, type, data } = modalFormState;
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);

  useEffect(() => {
    if (isShowModalForm) {
      onOpen();
      setInput("");
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
    const res =
      type === ADD_TYPE
        ? await importProduct({ productLineModel: input })
        : await exportProducts({
            products: data,
            distributeId: input,
          });
    if (res.status === 200 || res.status === 201) {
      toast({
        position: "top",
        title:
          type === ADD_TYPE
            ? "Thêm sản phẩm thành công"
            : "Chuyển sản phẩm đến đại lý thành công",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title:
          type === ADD_TYPE
            ? "Thêm sản phẩm thất bại"
            : "Chuyển sản phẩm đến đại lý thất bại",
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
          {type === ADD_TYPE
            ? "Thêm sản phẩm vào kho"
            : "Chuyển sản phẩm đến đại lý phân phối"}
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
          <Box m={"16px 0 8px"}>
            {type === ADD_TYPE
              ? "Kiểu sản phẩm (Model)"
              : "Số ID đại lý phân phối"}
          </Box>
          <Input
            type={"text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
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

export default ProduceFormModal;
