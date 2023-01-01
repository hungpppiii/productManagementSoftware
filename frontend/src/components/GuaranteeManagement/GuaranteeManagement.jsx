import { Box } from "@chakra-ui/react";
import GuaranteeList from "./GuaranteeList";

const GuaranteeManagement = () => {
  return (
    <Box p={["16px"]} mt={[0, "16px"]}>
      <GuaranteeList />
    </Box>
  );
};

export default GuaranteeManagement;
