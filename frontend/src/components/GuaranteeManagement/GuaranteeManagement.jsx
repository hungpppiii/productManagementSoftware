import { Box, useColorMode } from "@chakra-ui/react";
import GuaranteeList from "./GuaranteeList";

const GuaranteeManagement = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p={["16px"]}
      bgColor={colorMode === "light" && "white"}
      borderRadius={colorMode === "light" && "20px"}
      mt={[0, "16px"]}
    >
      <GuaranteeList />
    </Box>
  );
};

export default GuaranteeManagement;
