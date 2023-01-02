import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

import {
  handleSearchFunc,
  handleSelectTypeSearchFunc,
} from "../../utils/searchFunc";
import SearchBox from "../SearchBox";

const ListData = ({ data, noDataTitle, columnHeaders, mapFunc }) => {
  const [filterData, setFilterData] = useState();
  const [typeSearch, setTypeSearch] = useState("name");
  const { colorMode } = useColorMode();

  const input = useRef(null);

  useEffect(() => {
    handleSearch();
  }, [data]);

  const handleSelect = (e) => {
    handleSelectTypeSearchFunc(e, setFilterData, data, setTypeSearch);
  };

  const handleSearch = () => {
    if (!data) {
      console.log("handleSearch", data);
      return;
    }
    handleSearchFunc(input.current, data, setFilterData, typeSearch);
  };

  return (
    <Box
      p={["30px 16px 16px"]}
      mt={["16px"]}
      bgColor={colorMode === "light" && "white"}
      borderRadius={colorMode === "light" && "20px"}
    >
      <SearchBox {...{ input, handleSelect, handleSearch }} />
      {filterData &&
        (filterData.length === 0 ? (
          <p>{noDataTitle}</p>
        ) : (
          <TableContainer>
            <Table variant={"striped"} colorScheme={"teal"}>
              <Thead>
                <Tr fontWeight={800}>
                  {columnHeaders &&
                    columnHeaders.map((columnHeader, i) => {
                      return <Th key={i}>{columnHeader}</Th>;
                    })}
                </Tr>
              </Thead>
              <Tbody>{filterData.map(mapFunc)}</Tbody>
            </Table>
          </TableContainer>
        ))}
    </Box>
  );
};

export default ListData;
