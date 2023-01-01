import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Checkbox,
  Box,
  Flex,
  Button,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Select,
  useToast,
} from "@chakra-ui/react";
import { deleteFactoryAPI } from "../../api/factoryApi";
import FactoryItem from "../FactoryItem";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { GetDataAPIContext } from "../../stores";
import { GET_TYPE } from "../../config/pageName";

const FactoryList = ({ factories }) => {
  const [filterFactories, setFilterFactories] = useState(factories);
  const [checkedItems, setCheckedItems] = useState([]);
  const [typeSearch, setTypeSearch] = useState("all");
  const allChecked = checkedItems.every(Boolean);
  const isCheckedItem = checkedItems.some(Boolean);
  const input = useRef(null);
  const toast = useToast();
  const { getDataAPIDispatch } = useContext(GetDataAPIContext);

  useEffect(() => {
    handleSearch();
  }, [factories]);

  useEffect(() => {
    setCheckedItems(filterFactories?.map(() => false));
  }, [filterFactories]);

  const handleAllChecked = (e) => {
    setCheckedItems(checkedItems.map(() => e.target.checked));
  };

  const handleSelectTypeSearch = (e) => {
    if (e.target.value === "all") {
      factories && setFilterFactories(factories);
    }
    setTypeSearch(e.target.value);
  };

  const handleSearch = () => {
    if (!factories) {
      return;
    }

    if (typeSearch === "all") {
      setFilterFactories(factories);
      return;
    }

    if (input.current) {
      const query = input.current.value.toUpperCase();
      const newFilterFactories = factories.filter((factory) =>
        factory[typeSearch].toUpperCase().includes(query)
      );
      setFilterFactories(newFilterFactories);
    }
  };

  const handleDelete = async () => {
    let message = true;
    const deleteFactory = async () => {
      for (let i = filterFactories.length - 1; i >= 0; i--) {
        if (checkedItems[i]) {
          const res = await deleteFactoryAPI(filterFactories[i].id);
          if (res.status === 200) {
          } else {
            message = false;
          }
        }
      }
    };
    await deleteFactory();
    if (message) {
      toast({
        position: "top",
        title: "Xóa cơ sở thành công",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Xóa cơ sở thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    getDataAPIDispatch({ type: GET_TYPE });
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

  const debounceDelete = useCallback((callback, timeout) => {
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
      <Flex mb={"12px"} wrap={"wrap"}>
        <InputGroup flex={["100%", 4]}>
          <InputLeftElement
            pointerEvents="none"
            children={<BsSearch color="gray.300" />}
          />
          <Input
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") debounceSearch(handleSearch, 200)();
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
          // maxW={'100px'}
          onChange={handleSelectTypeSearch}
        >
          <option value="all">Tất cả</option>
          <option value="name">Tên</option>
          <option value="address">Địa chỉ</option>
        </Select>
      </Flex>
      {factories && factories.length === 0 ? (
        "Hiện tại chưa có cơ sở nào"
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th p={"0 0 0 24px"}>
                  <Flex minH={"32px"}>
                    <Checkbox
                      isChecked={allChecked}
                      onChange={(e) => handleAllChecked(e)}
                    />
                    <Button
                      visibility={isCheckedItem ? "visible" : "hidden"}
                      colorScheme={"red"}
                      size={"sm"}
                      ml={"12px"}
                      onClick={debounceDelete(handleDelete, 200)}
                    >
                      Xóa
                    </Button>
                  </Flex>
                </Th>
                <Th fontWeight={800}>ID</Th>
                <Th fontWeight={800}>Tên cơ sở</Th>
                <Th fontWeight={800}>Loại cơ sở</Th>
                <Th fontWeight={800}>Email</Th>
                <Th fontWeight={800}>Thao tác</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filterFactories &&
                filterFactories.map((factory, index) => {
                  return (
                    <FactoryItem
                      key={index}
                      {...{ checkedItems, setCheckedItems }}
                      index={index}
                      {...factory}
                    />
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default FactoryList;
