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
import { exportGuaranteeAPI, exportOrderAPI } from "../../api/distributeApi";
import { getFactoriesByTypeAPI } from "../../api/factoryApi";
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
  const [listGuarantee, setListGuarantee] = useState([]);
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
    const getListGuarantee = async () => {
      const res = await getFactoriesByTypeAPI("guarantee");
      if (res.status === 200) {
        setListGuarantee(res.data);
      } else {
        toast({
          position: "top",
          title: "Fetch data failed",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };
    getListGuarantee();
  }, []);

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
            insuranceDate: "2023/01/04",
            guaranteeId: input1,
            error: input2,
          })
        : await exportOrderAPI({
            productCode: data.code,
            orderDate: "2023/01/04",
            orderName: input1,
            orderPhone: input2,
            orderAddress: input3,
          });
    if (res.status === 200 || res.status === 201) {
      toast({
        position: "top",
        title:
          type === EXPORT_GUARANTEE_TYPE
            ? "Chuy???n ?????n trung t??m b???o h??nh th??nh c??ng"
            : "Th??nh c??ng",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title:
          type === EXPORT_GUARANTEE_TYPE
            ? "Chuy???n ?????n trung t??m b???o h??nh th???t b???i"
            : "Th??nh c??ng",
        status: type === EXPORT_GUARANTEE_TYPE ? "error" : "success",
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
          {type === EXPORT_GUARANTEE_TYPE
            ? "Chuy???n s???n ph???m ?????n trung t??m b???o h??nh"
            : "Th??ng tin ????n h??ng"}
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
          <Box m={"16px 0 8px"}>
            {" "}
            {type === EXPORT_GUARANTEE_TYPE
              ? "Trung t??m b???o h??nh"
              : "T??n kh??ch h??ng"}
          </Box>
          {type === EXPORT_GUARANTEE_TYPE ? (
            <Select
              flex={1}
              borderRadius={"5px"}
              onChange={(e) => setInput1(e.target.value)}
              bgColor={"#2d3748"}
              mb={"16px"}
              placeholder={"Ch???n trung t??m b???o h??nh"}
            >
              {listGuarantee.map((guarantee) => {
                return (
                  <option
                    style={{ background: "#2d3748" }}
                    value={guarantee.id}
                  >
                    {guarantee.name}
                  </option>
                );
              })}
            </Select>
          ) : (
            <Input
              type={"text"}
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
          )}
          <Box m={"16px 0 8px"}>
            {type === EXPORT_GUARANTEE_TYPE ? "L???i s???n ph???m" : "S??? ??i???n tho???i"}
          </Box>
          <Input
            type={"text"}
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          {type === EXPORT_ORDER_TYPE && (
            <>
              <Box m={"16px 0 8px"}>?????a ch???</Box>
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

export default DistributeFormModal;
