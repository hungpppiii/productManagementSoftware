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
import { getFactoriesByTypeAPI } from "../../api/factoryApi";
import { exportProducts, importProduct } from "../../api/produceApi";
import { getProductLinesAPI } from "../../api/productLineApi";
import { HIDDEN_MODAL_FORM } from "../../config/modalFormType";
import { ADD_TYPE, GET_TYPE } from "../../config/pageName";
import { GetDataAPIContext, ModalFormContext } from "../../stores";

const ProduceFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [input, setInput] = useState("");
  const [listDistribute, setListDistribute] = useState([]);
  const [listProductLine, setListProductLine] = useState([]);
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

  useEffect(() => {
    const getListDistribute = async () => {
      const res1 = await getFactoriesByTypeAPI("distribute");
      const res2 = await getProductLinesAPI();
      if (res1.status === 200 && res2.status === 200) {
        setListDistribute(res1.data);
        setListProductLine(res2.data);
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
    getListDistribute();
  }, []);

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
            zIndex={100}
          >
            <Spinner thickness="4px" size={"xl"} speed={"0.6s"} />
          </Flex>
        )}
        <ModalBody>
          <Box m={"16px 0 8px"}>
            {type === ADD_TYPE ? "Dòng sản phẩm" : "Đại lý phân phối"}
          </Box>
          {type === ADD_TYPE ? (
            <Select
              flex={1}
              borderRadius={"5px"}
              onChange={(e) => setInput(e.target.value)}
              bgColor={"#2d3748"}
              mb={"16px"}
              placeholder={"Chọn dòng sản phẩm"}
            >
              {listProductLine.map((productLine) => {
                return (
                  <option
                    style={{ background: "#2d3748" }}
                    value={productLine.model}
                  >
                    {productLine.name}
                  </option>
                );
              })}
            </Select>
          ) : (
            <Select
              flex={1}
              borderRadius={"5px"}
              onChange={(e) => setInput(e.target.value)}
              bgColor={"#2d3748"}
              mb={"16px"}
              placeholder={"Chọn đại lý phân phối"}
            >
              {listDistribute.map((distribute) => {
                return (
                  <option
                    style={{ background: "#2d3748" }}
                    value={distribute.id}
                  >
                    {distribute.name}
                  </option>
                );
              })}
            </Select>
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

export default ProduceFormModal;
