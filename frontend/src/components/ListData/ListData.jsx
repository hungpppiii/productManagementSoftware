import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import ProductLinesItem from "../ListItem";

import { getDate } from "../../utils/getDate";
import {
  handleSearchFunc,
  handleSelectTypeSearchFunc,
} from "../../utils/searchFunc";
import SearchBox from "../SearchBox";

const ListData = ({ data, noDataTitle, columnHeaders }) => {
  const [filterData, setFilterData] = useState();
  const [typeSearch, setTypeSearch] = useState("name");

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
    <Box mt={"12px"}>
      <SearchBox {...{ input, handleSelect, handleSearch }} />
      {filterData &&
        (filterData.length === 0 ? (
          { noDataTitle }
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
              <Tbody>
                {filterData.map((productLine, index) => {
                  return (
                    <ProductLinesItem
                      key={index}
                      listItem={[
                        productLine.id,
                        productLine.name,
                        productLine.model,
                        productLine.guaranteePeriod + " tháng",
                        getDate(productLine.createdAt),
                      ]}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ))}
    </Box>
  );
};

export default ListData;
