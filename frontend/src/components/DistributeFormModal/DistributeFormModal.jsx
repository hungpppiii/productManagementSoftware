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
import { exportGuaranteeAPI, exportOrderAPI } from "../../api/distributeApi";
import { HIDDEN_MODAL_FORM } from "../../config/modalFormType";
import {
  EXPORT_GUARANTEE_TYPE,
  EXPORT_ORDER_TYPE,
  GET_TYPE,
} from "../../config/pageName";
import { GetDataAPIContext, ModalFormContext } from "../../stores";

const DistributeFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const { modalFormState, modalFormDispatch } = useContext(ModalFormContext);
  const { isShowModalForm, type, data } = modalFormState;
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);

  useEffect(() => {
    if (isShowModalForm) {
      onOpen();
      setInput1("");
      setInput2("");
      setInput3("");
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
      type === EXPORT_GUARANTEE_TYPE
        ? await exportGuaranteeAPI({
            productCode: data.code,
            insuranceDate: "2023/01/03",
            guaranteeId: input1,
            error: input2,
          })
        : await exportOrderAPI({
            productCode: data.code,
            orderDate: "2023/01/03",
            orderName: input1,
            orderPhone: input2,
            orderAddress: input3,
          });
    if (res.status === 200 || res.status === 201) {
      toast({
        position: "top",
        title:
          type === EXPORT_GUARANTEE_TYPE
            ? "Chuyển đến trung tâm bảo hành thành công"
            : "Thành công",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title:
          type === EXPORT_GUARANTEE_TYPE
            ? "Chuyển đến trung tâm bảo hành thất bại"
            : "Thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSaveForm = async () => {
    setShowSpinner(true);
    saveForm();
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
          {type === EXPORT_GUARANTEE_TYPE
            ? "Chuyển sản phẩm đến trung tâm bảo hành"
            : "Thông tin đơn hàng"}
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
            {" "}
            {type === EXPORT_GUARANTEE_TYPE
              ? "Số ID trung tâm bảo hành"
              : "Tên khách hàng"}
          </Box>
          <Input
            type={"text"}
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <Box m={"16px 0 8px"}>
            {type === EXPORT_GUARANTEE_TYPE ? "Lỗi sản phẩm" : "Số điện thoại"}
          </Box>
          <Input
            type={"text"}
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          {type === EXPORT_ORDER_TYPE && (
            <>
              <Box m={"16px 0 8px"}>Địa chỉ</Box>
              <Input
                type={"text"}
                value={input3}
                onChange={(e) => setInput3(e.target.value)}
              />
            </>
          )}
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

export default DistributeFormModal;
