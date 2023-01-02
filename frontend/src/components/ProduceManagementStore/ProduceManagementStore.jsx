import { Box, Button } from "@chakra-ui/react";
import ListData from "../ListData";
import { GetDataAPIContext, ModalFormContext } from "../../stores";
import { useCallback, useContext } from "react";
import {
  EXPORT_DISTRIBUTE_BTN_TITLE,
  EXPORT_TYPE,
  PRODUCE_PRODUCT_PAGE,
} from "../../config/pageName";
import { PRODUCT_NO_DATA_TITLE } from "../../config/noDataTitle";
import { PRODUCE_PRODUCT_COLUMN_HEADERS } from "../../config/columnHeaders";
import { getDate } from "../../utils/getDate";
import ListItem from "../ListItem/ListItem";
import { SHOW_MODAL_FORM } from "../../config/modalFormType";

const ProduceManagementStore = () => {
  const { getDataAPIState } = useContext(GetDataAPIContext);
  const { modalFormDispatch } = useContext(ModalFormContext);
  const columnHeaders = PRODUCE_PRODUCT_COLUMN_HEADERS;

  const handleOnClickEditBtn = useCallback((data) => {
    return () => {
      modalFormDispatch({
        type: SHOW_MODAL_FORM,
        payload: { type: EXPORT_TYPE, data },
      });
    };
  }, []);

  return (
    <Box p={["16px"]} mt={[0, "16px"]}>
      {getDataAPIState.pageName === PRODUCE_PRODUCT_PAGE ? (
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
                  getDate(e.createdAt),
                ]}
              >
                <Button
                  onClick={handleOnClickEditBtn([product])}
                  whiteSpace={"no-wrap"}
                >
                  {EXPORT_DISTRIBUTE_BTN_TITLE}
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

export default ProduceManagementStore;
