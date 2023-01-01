import {
  Tr,
  Th,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { IoIosOptions } from "react-icons/io";
import { useCallback, useContext } from "react";
import { ReportContext, UserContext } from "../../stores";

const GuaranteeItem = ({
  Product,
  productCode,
  produceId,
  insuranceDate,
  error,
}) => {
  const { ProductLine } = Product;
  const reportDispatch = useContext(ReportContext)[1];
  const getDate = useCallback((date) => {
    return date?.split("T").at(0).split("-").reverse().join("/");
  });

  const distribute_date = getDate(Product.createdAt);
  const guaranteeDate = getDate(insuranceDate);
  const userState = useContext(UserContext);

  return (
    <Tr>
      <Th>
        <Box whiteSpace={"normal"}>{Product.code}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{ProductLine.name}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{distribute_date}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{guaranteeDate}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{ProductLine.guaranteePeriod} tháng</Box>
      </Th>
      {/* <Th>
        <Box whiteSpace={"normal"}>Nhà máy Hà nội</Box>
      </Th> */}
      <Th>
        <Box whiteSpace={"normal"}>{userState.fullName}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{error}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{Product.status && "Đang bảo hành"}</Box>
      </Th>
      <Th>
        <Menu>
          <MenuButton
            as={IconButton}
            fontSize={"1.2rem"}
            icon={<IoIosOptions />}
            variant={"outline"}
          />
          <MenuList>
            <MenuItem
              onClick={() => {
                reportDispatch({
                  type: "showReportModal",
                  payload: { typeReport: "distribute", productCode },
                });
              }}
            >
              Chuyển về đại lý phân phối
            </MenuItem>
            <MenuItem
              onClick={() => {
                reportDispatch({
                  type: "showReportModal",
                  payload: { typeReport: "produce", productCode, produceId },
                });
              }}
            >
              Chuyển về cơ sở sản xuất
            </MenuItem>
          </MenuList>
        </Menu>
      </Th>
    </Tr>
  );
};

export default GuaranteeItem;
