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
      getDataAPIState.pageName !== GUARANTEE_PRODUCT_PAGE
    ) {
      console.log("bcd", getDataAPIState.data, getDataAPIState.type);
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
            placeholder="T??m ki???m"
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
          <option value="all">T???t c???</option>
          <option value="name">T??n s???n ph???m</option>
          {/* <option value="guarantee">Trung t??m b???o h??nh</option> */}
        </Select>
      </Flex>
      {filterGuaranteeProducts &&
        (filterGuaranteeProducts.length === 0 ? (
          "Hi???n t???i kh??ng c?? s???n ph???m n??o ???????c b???o h??nh"
        ) : (
          <TableContainer>
            <Table variant={"striped"} colorScheme={"teal"}>
              <Thead>
                <Tr fontWeight={800}>
                  <Th>S??? Serial</Th>
                  <Th>T??n s???n ph???m</Th>
                  <Th>Ng??y s???n xu???t</Th>
                  <Th>Ng??y ti???p nh???n</Th>
                  <Th>Th???i gian b???o h??nh</Th>
                  {/* <Th>Trung t??m b???o h??nh</Th> */}
                  {/* <Th>?????i l?? ph??n ph???i</Th> */}
                  <Th>Lo???i l???i</Th>
                  <Th>Tr???ng th??i</Th>
                  <Th>X??? l??</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filterGuaranteeProducts &&
                  filterGuaranteeProducts.map((guaranteeProduct, index) => {
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
