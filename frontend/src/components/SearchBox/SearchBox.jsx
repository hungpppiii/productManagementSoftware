import {
  Flex,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { debounceSearch } from "../../utils/debounce";

const SearchBox = ({ input, handleSearch, handleSelect }) => {
  return (
    <Flex mb={"12px"} wrap={"wrap"}>
      <InputGroup flex={["100%", 4]}>
        <InputLeftElement
          pointerEvents="none"
          children={<BsSearch color="gray.300" />}
        />
        <Input
          ref={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") debounceSearch(() => handleSearch(), 200)();
          }}
          type="text"
          placeholder="Tìm kiếm"
        />
        <InputRightElement>
          <MdSend
            cursor={"pointer"}
            onClick={() => {
              debounceSearch(() => handleSearch(), 200)();
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
        onChange={handleSelect}
      >
        <option value="all">Tất cả</option>
        <option value="name">Tên</option>
      </Select>
    </Flex>
  );
};

export default SearchBox;
