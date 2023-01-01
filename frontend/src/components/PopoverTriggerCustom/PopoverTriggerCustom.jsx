import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const PopoverTriggerCustom = ({ nameBtn, saveFunc, children }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Box whiteSpace={"normal"} color={"blue"} cursor={"pointer"}>
          {nameBtn}
        </Box>
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverHeader fontWeight="semibold">Chỉnh sửa thông tin</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{children}</PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button
              onClick={() => {
                onClose();
                saveFunc();
              }}
              colorScheme="blue"
            >
              Lưu
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverTriggerCustom;
