import { Box, Button } from "@chakra-ui/react";
import ListData from "../ListData";
import { GetDataAPIContext, ModalFormContext } from "../../stores";
import { useCallback, useContext, useRef } from "react";
import {
  ADMIN_PRODUCT_LINE_PAGE,
  EDIT_BTN_TITLE,
  EDIT_TYPE,
} from "../../config/pageName";
import { PRODUCT_NO_DATA_TITLE } from "../../config/noDataTitle";
import { ADMIN_PRODUCT_LINE_COLUMN_HEADERS } from "../../config/columnHeaders";
import { getDate } from "../../utils/getDate";
import ListItem from "../ListItem/ListItem";
import { SHOW_MODAL_FORM } from "../../config/modalFormType";

const ProductLinesManagement = () => {
  const { getDataAPIState } = useContext(GetDataAPIContext);
  const { modalFormDispatch } = useContext(ModalFormContext);
  const noDataTitle = useRef(PRODUCT_NO_DATA_TITLE);
  const columnHeaders = ADMIN_PRODUCT_LINE_COLUMN_HEADERS;

  const handleOnClickEditBtn = useCallback((data) => {
    return () => {
      modalFormDispatch({
        type: SHOW_MODAL_FORM,
        payload: { type: EDIT_TYPE, data },
      });
    };
  }, []);

  return (
    <Box>
      {getDataAPIState.pageName === ADMIN_PRODUCT_LINE_PAGE ? (
        <ListData
          data={getDataAPIState.data}
          {...{ noDataTitle, columnHeaders }}
          mapFunc={(e, i) => {
            return (
              <ListItem
                listItem={[
                  e.id,
                  e.name,
                  e.model,
                  e.guaranteePeriod + " tháng",
                  getDate(e.createdAt),
                ]}
              >
                <Button
                  onClick={handleOnClickEditBtn(e)}
                  whiteSpace={"no-wrap"}
                >
                  {EDIT_BTN_TITLE}
                </Button>
              </ListItem>
            );
          }}
        />
      ) : (
        <p>NO DATA {getDataAPIState.pageName} abc</p>
      )}
    </Box>
  );
};

export default ProductLinesManagement;
