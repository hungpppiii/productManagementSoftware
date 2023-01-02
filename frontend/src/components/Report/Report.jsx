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
  Textarea,
} from "@chakra-ui/react";
import { useContext, useEffect, useState, useCallback } from "react";
import { exportDistributeAPI, exportProduceAPI } from "../../api/guaranteeAPI";
import { GET_TYPE } from "../../config/pageName";
import { GetDataAPIContext, ReportContext } from "../../stores";

const Report = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [inputTitle, setInputTitle] = useState("");
  const [inputReport, setInputReport] = useState("");
  const [inputProduceId, setInputProduceId] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [reportState, reportDispatch] = useContext(ReportContext);
  const { isShowReportModal, typeReport, productCode, produceId } = reportState;
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);

  useEffect(() => {
    if (isShowReportModal) {
      onOpen();
      setInputTitle("");
      setInputReport("");
      setInputProduceId(produceId);
    } else {
      onClose();
    }
  }, [isShowReportModal]);

  useEffect(() => {
    if (!isOpen) {
      reportDispatch({ type: "hiddenReportModal" });
    }
  }, [isOpen, reportDispatch]);

  const handleExportDistribute = useCallback(async () => {
    const res = await exportDistributeAPI({ productCode });
    if (res.status === 200) {
      toast({
        position: "top",
        title: "Chuyển về đại lý phân phối thành công",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Chuyển về đại lý phân phối thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [productCode]);

  const handleExportProduce = useCallback(async () => {
    const res = await exportProduceAPI({
      productCode,
      produceId: produceId || inputProduceId,
    });
    if (res.status === 200) {
      toast({
        position: "top",
        title: "Chuyển về cơ sở sản xuất thành công",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Chuyển về cơ sở sản xuất thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [productCode, produceId]);

  const handleSaveFactory = async () => {
    setShowSpinner(true);

    switch (typeReport) {
      case "produce":
        await handleExportProduce();
        break;
      case "distribute":
        await handleExportDistribute();
        break;
      default:
        break;
    }
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
          {typeReport === "produce"
            ? "Chuyển về cơ sở sản xuất"
            : "Chuyển về đại lý phân phối"}
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
          <Box m={"0 0 8px"}>Tiêu đề</Box>
          <Input
            type={"text"}
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          {typeReport === "produce" && !produceId && (
            <>
              <Box m={"16px 0 8px"}>Số ID cơ sở sản xuất</Box>
              <Input
                type={"text"}
                value={inputProduceId}
                onChange={(e) => setInputProduceId(e.target.value)}
              />{" "}
            </>
          )}
          <Box m={"16px 0 8px"}>Nội dung phản hồi</Box>
          <Textarea
            value={inputReport}
            onChange={(e) => setInputReport(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            w={["100%", "initial"]}
            colorScheme={"blue"}
            mr={6}
            onClick={handleSaveFactory}
          >
            Gửi
          </Button>
          <Button w={["100%", "initial"]} onClick={onClose} colorScheme="red">
            Hủy bỏ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Report;
