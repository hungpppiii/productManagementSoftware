import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
  Flex,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { GetDataAPIContext } from "../../stores";
import GuaranteeItem from "./GuaranteeItem";
import Report from "../Report";
import { GUARANTEE_PRODUCT_PAGE } from "../../config/pageName";

const GuaranteeList = () => {
  const { getDataAPIState } = useContext(GetDataAPIContext);

  const [filterGuaranteeProducts, setFilterGuaranteeProducts] = useState();

  const [typeSearch, setTypeSearch] = useState("name");
  const input = useRef(null);

  useEffect(() => {
    handleSearch();
  }, [getDataAPIState.data]);

  const handleSelectTypeSearch = (e) => {
    if (e.target.value === "all") {
      setFilterGuaranteeProducts(getDataAPIState.data);
    }
    setTypeSearch(e.target.value);
  };

  const handleSearch = () => {
    if (
      !getDataAPIState.data ||
      getDataAPIState.type !== GUARANTEE_PRODUCT_PAGE
    ) {
      return;
    }
    if (typeSearch === "all") {
      setFilterGuaranteeProducts(getDataAPIState.data);
      return;
    }
    if (input.current) {
      const query = input.current.value.toUpperCase();
      const newFilterGuaranteeProducts = getDataAPIState.data.filter(
        (factory) =>
          factory.Product.ProductLine[typeSearch].toUpperCase().includes(query)
      );
      setFilterGuaranteeProducts(newFilterGuaranteeProducts);
    }
  };

  const debounceSearch = useCallback((callback, timeout) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(this, args);
      }, timeout);
    };
  }, []);

  return (
    <Box mt={"12px"}>
      <Report />
      <Flex mb={"12px"} wrap={"wrap"}>
        <InputGroup flex={["100%", 4]}>
          <InputLeftElement
            pointerEvents="none"
            children={<BsSearch color="gray.300" />}
          />
          <Input
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") debounceSearch(handleSearch())();
            }}
            type="text"
            placeholder="Tìm kiếm"
          />
          <InputRightElement>
            <MdSend
              cursor={"pointer"}
              onClick={() => {
                debounceSearch(handleSearch, 200)();
              }}
              fontSize={"24px"}
            />
          </InputRightElement>
        </InputGroup>
        <Select
          flex={["100%", 4, 2, 1]}
          ml={[0, "8px"]}
          mt={["8px", 0]}
          borderRadius={"5px"}
          onChange={handleSelectTypeSearch}
        >
          <option value="all">Tất cả</option>
          <option value="name">Tên sản phẩm</option>
          <option value="guarantee">Trung tâm bảo hành</option>
        </Select>
      </Flex>
      {filterGuaranteeProducts &&
        (filterGuaranteeProducts.length === 0 ? (
          "Hiện tại không có sản phẩm nào được bảo hành"
        ) : (
          <TableContainer>
            <Table variant={"striped"} colorScheme={"teal"}>
              <Thead>
                <Tr fontWeight={800}>
                  <Th>Số Serial</Th>
                  <Th>Tên sản phẩm</Th>
                  <Th>Ngày sản xuất</Th>
                  <Th>Ngày tiếp nhận</Th>
                  <Th>Thời gian bảo hành</Th>
                  <Th>Trung tâm bảo hành</Th>
                  {/* <Th>Đại lý phân phối</Th> */}
                  <Th>Loại lỗi</Th>
                  <Th>Trạng thái</Th>
                  <Th>Xử lý</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filterGuaranteeProducts.map((guaranteeProduct, index) => {
                  return <GuaranteeItem key={index} {...guaranteeProduct} />;
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ))}
    </Box>
  );
};

export default GuaranteeList;
