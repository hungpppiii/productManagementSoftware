import { Box } from "@chakra-ui/react";
import ListData from "../ListData";
import { GetDataAPIContext } from "../../stores";
import { useContext, useRef } from "react";
import { PRODUCE_ERROR_PRODUCT_PAGE } from "../../config/pageName";
import { PRODUCT_NO_DATA_TITLE } from "../../config/noDataTitle";
import { PRODUCE_ERROR_PRODUCT_COLUMN_HEADERS } from "../../config/columnHeaders";
import { getDate } from "../../utils/getDate";
import ListItem from "../ListItem/ListItem";

const ProduceManagementErrorProducts = () => {
  const { getDataAPIState } = useContext(GetDataAPIContext);
  const columnHeaders = PRODUCE_ERROR_PRODUCT_COLUMN_HEADERS;

  return (
    <Box>
      {getDataAPIState.pageName === PRODUCE_ERROR_PRODUCT_PAGE ? (
        <ListData
          data={getDataAPIState.data}
          {...{ noDataTitle: PRODUCT_NO_DATA_TITLE, columnHeaders }}
          mapFunc={(e, i) => {
            return (
              <ListItem
                key={i}
                listItem={[
                  e.id,
                  e.code,
                  e.ProductLine?.name,
                  e.productLineModel,
                  "Sản phẩm lỗi",
                  getDate(e.createdAt),
                  getDate(e.updatedAt),
                ]}
              />
            );
          }}
        />
      ) : (
        <p>NO DATA {getDataAPIState.pageName} abc</p>
      )}
    </Box>
  );
};

export default ProduceManagementErrorProducts;
