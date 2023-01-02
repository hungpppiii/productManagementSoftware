import { useContext, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  ChakraProvider,
  FormErrorMessage,
  Image,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { loginApi } from "../api/accountApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../stores";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const userDispatch = useContext(UserContext)[1];
  const handleShowClick = () => setShowPassword(!showPassword);

  let navigate = useNavigate();

  const handleNavigate = () => {
    switch (sessionStorage.getItem("userRole")) {
      case "admin":
        navigate("/manage-product-lines");
        break;
      case "produce":
        navigate("/produce/manage-store");
        break;
      case "distribute":
        navigate("/distribute/manage-store");
        break;
      case "guarantee":
        navigate("/guarantee/manage-insurance-products");
        break;
      default:
        break;
    }
  };

  handleNavigate();

  const handleSubmit = (values) => {
    const login = async (data) => {
      const response = await loginApi(data);
      console.log("res in login", response);
      const type = typeof response;

      if (response.status === 200) {
        // console.log("login success", response);
        // console.log("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        const { email, imageUrl, name, type } = response.data.account_info;
        sessionStorage.setItem("userRole", type);
        userDispatch({
          type: "login",
          payload: { email, imageUrl, name, type },
        });
        setTimeout(() => handleNavigate(type), 2000);
      } else if (response.status === 404) {
        console.log("login error", response);
      }
    };

    const data = {
      account: values.account,
      password: values.password,
    };
    console.log("data: " + JSON.stringify(data));
    login(data);
  };

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: yup.object({
      account: yup.string().required("This field is required."),
      password: yup.string().required("This field is required."),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <ChakraProvider>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex flex={1}>
          <Image
            src="https://d3kqdc25i4tl0t.cloudfront.net/articles/content/525_687896_sales.hero.jpg"
            objectFit="cover"
          ></Image>
        </Flex>

        <Flex
          flex={1}
          flexDirection="columb"
          width="100wh"
          height="100vh"
          backgroundColor="blueAlpha.600"
          justifyContent="center"
          alignItem="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Heading mb="56px" color="whiteAlpha.900">
              PRODUCTION MOVE
            </Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <Stack
                spacing={4}
                p="1rem"
                // backgroundColor="gray.50"
                boxShadow="md"
              >
                <FormControl isInvalid={formik.errors.account}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.500" />}
                    />
                    <Input
                      name="account"
                      type="email"
                      placeholder="Nhập email"
                      // style={{
                      //   color: "black",
                      //   border: "1px solid black",
                      // }}
                      onChange={formik.handleChange}
                      value={formik.values.account}
                    />
                  </InputGroup>
                  {/* <FormErrorMessage>{formik.errors.account}</FormErrorMessage> */}
                </FormControl>
                <FormControl isInvalid={formik.errors.password}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.500"
                      children={<CFaLock color="gray.500" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      style={
                        {
                          // color: "black",
                          // border: "1px solid black",
                        }
                      }
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Nhập mật khẩu"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        color="gray.500"
                        h="1.75rem"
                        size="sm"
                        onClick={handleShowClick}
                      >
                        {showPassword ? "Ẩn" : "Hiện"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {/* <FormErrorMessage>{formik.errors.password}</FormErrorMessage> */}
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="telegram"
                  width="full"
                  onClick={formik.handleSubmit}
                >
                  Đăng nhập
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </ChakraProvider>
  );
};

export default Login;
