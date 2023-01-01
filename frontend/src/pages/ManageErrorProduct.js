import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  CheckboxGroup,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { getAllErrorProducts } from "../api/produceApi";

const productData = [
  {
    id: 1,
    name: "A",
    quantity: 100,
    exportFor: "ABC",
    fault: "hong nguon",
  },
  {
    id: 2,
    name: "B",
    quantity: 100,
    exportFor: "ABC",
    fault: "hong nguon",
  },
  {
    id: 3,
    name: "C",
    quantity: 100,
    exportFor: "ABC",
    fault: "hong nguon",
  },
  {
    id: 4,
    name: "D",
    quantity: 100,
    exportFor: "ABC",
    fault: "hong nguon",
  },
];

function ManageErrorProduct() {
  const [users, setUsers] = useState([]);
  const [errorProducts, setErrorProducts] = useState();

  useEffect(() => {
    setUsers(productData);
  }, []);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getAllErrorProducts(token, setErrorProducts);
  }, []);
  console.log("error products", errorProducts);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    // console.log('click on create')
    navigate(`/create-account`);
  };

  return (
    <div className="ManageErrorProduct">
      <h1
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "36px",
        }}
      >
        Manage Defective Products
      </h1>

      <ChakraProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "600",
              fontSize: "24px",
              marginLeft: "20px",
            }}
          >
            Danh sách sản phẩm lỗi
          </h2>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            variant="solid"
            className="add-btn"
            style={{ marginRight: "20px" }}
            onClick={handleClick}
          >
            Thêm sản phẩm lỗi mới
          </Button>
        </div>
        <Box
          p={4}
          style={{
            backgroundColor: "white",
            marginBottom: "10px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        >
          <form className="input-form">
            <Stack direction="row" spacing={4}>
              <Select
                placeholder="Thêm điều kiện lọc"
                className="select-comp"
                style={{ color: "black", border: "1px solid black" }}
                p={1}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              <InputGroup className="input-comp">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" className="icon" />}
                />
                <Input
                  type="text"
                  placeholder="Tìm kiếm"
                  style={{ color: "black", border: "1px solid black" }}
                />
              </InputGroup>
            </Stack>
          </form>

          <TableContainer className="table">
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="allSelect"
                      // checked={
                      //   users.filter((user) => user?.isChecked !== true).length < 1
                      // }
                      checked={!users.some((user) => user?.isChecked !== true)}
                      onChange={handleChange}
                    />
                  </Th>
                  <Th>Mã sản phẩm</Th>
                  <Th>Dòng sản phẩm</Th>
                  <Th>Xuất cho đại lý</Th>
                  <Th>Trạng thái</Th>
                </Tr>
              </Thead>
              <Tbody>
                {errorProducts === undefined || errorProducts.length === 0 ? (
                  <p style={{ color: "black" }}>
                    There is no defective product.
                  </p>
                ) : (
                  errorProducts.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={item.id}
                          checked={item?.isChecked}
                          onChange={handleChange}
                        />
                      </Td>
                      <Td>{item.code}</Td>
                      <Td>{item.productLineModel}</Td>
                      <Td>{item.distributeId}</Td>
                      <Td>{item.status}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>
                    <Checkbox></Checkbox>
                  </Th>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default ManageErrorProduct;
