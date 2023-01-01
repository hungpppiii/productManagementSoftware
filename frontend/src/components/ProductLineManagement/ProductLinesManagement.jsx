import { Box } from "@chakra-ui/react";
import ListData from "../ListData";
import { GetDataAPIContext } from "../../stores";
import { useContext, useRef } from "react";
import { ADMIN_PRODUCT_LINE_PAGE } from "../../config/pageName";
import { PRODUCT_NO_DATA_TITLE } from "../../config/noDataTitle";
import { ADMIN_PRODUCT_LINE_COLUMN_HEADERS } from "../../config/columnHeaders";

const ProductLinesManagement = () => {
  const { getDataAPIState } = useContext(GetDataAPIContext);

  const noDataTitle = useRef(PRODUCT_NO_DATA_TITLE);
  const columnHeaders = ADMIN_PRODUCT_LINE_COLUMN_HEADERS;

  return (
    <Box p={["16px"]} mt={[0, "16px"]}>
      {getDataAPIState.pageName === ADMIN_PRODUCT_LINE_PAGE ? (
        <ListData
          data={getDataAPIState.data}
          {...{ noDataTitle, columnHeaders }}
        />
      ) : (
        <p>NO DATA {getDataAPIState.pageName} abc</p>
      )}
    </Box>
  );
};

export default ProductLinesManagement;
