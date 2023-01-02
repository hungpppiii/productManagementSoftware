import { Box, Button } from "@chakra-ui/react";
import ListData from "../ListData";
import { GetDataAPIContext, ModalFormContext } from "../../stores";
import { useCallback, useContext } from "react";
import {
  DISTRIBUTE_PRODUCT_SOLD_PAGE,
  EXPORT_GUARANTEE_BTN_TITLE,
  EXPORT_GUARANTEE_TYPE,
} from "../../config/pageName";
import { PRODUCT_NO_DATA_TITLE } from "../../config/noDataTitle";
import { getDate } from "../../utils/getDate";
import ListItem from "../ListItem/ListItem";
import { SHOW_MODAL_FORM } from "../../config/modalFormType";
import { DISTRIBUTE_PRODUCT_SOLD_COLUMN_HEADERS } from "../../config/columnHeaders";

const DistributeManagementProductSold = () => {
  const { getDataAPIState } = useContext(GetDataAPIContext);
  const { modalFormDispatch } = useContext(ModalFormContext);
  const columnHeaders = DISTRIBUTE_PRODUCT_SOLD_COLUMN_HEADERS;

  const handleOnClickEditBtn = useCallback((data) => {
    return () => {
      modalFormDispatch({
        type: SHOW_MODAL_FORM,
        payload: { type: EXPORT_GUARANTEE_TYPE, data },
      });
    };
  }, []);

  return (
    <Box>
      {getDataAPIState.pageName === DISTRIBUTE_PRODUCT_SOLD_PAGE ? (
        <ListData
          data={getDataAPIState.data}
          {...{ noDataTitle: PRODUCT_NO_DATA_TITLE, columnHeaders }}
          mapFunc={(e, i) => {
            const { ProductLine, ...product } = e;
            return (
              <ListItem
                key={i}
                listItem={[
                  e.id,
                  e.code,
                  e.ProductLine.name,
                  e.ProductLine.model,
                  e.ProductLine.guaranteePeriod + " tháng",
                  "Đã bán",
                  getDate(e.updatedAt),
                ]}
              >
                <Button
                  onClick={handleOnClickEditBtn(product)}
                  whiteSpace={"no-wrap"}
                >
                  {EXPORT_GUARANTEE_BTN_TITLE}
                </Button>
              </ListItem>
            );
          }}
        />
      ) : (
        <p>NO DATA {getDataAPIState.pageName}</p>
      )}
    </Box>
  );
};

export default DistributeManagementProductSold;
