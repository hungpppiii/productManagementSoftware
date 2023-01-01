import { useReducer, createContext, useCallback } from "react";

const initialState = {
  isShowReportModal: false,
  typeReport: null,
  productCode: null,
  produceId: null,
};

export const ModalFormContext = createContext(initialState);

const ModalFormStore = ({ children }) => {
  const modalFormReducer = useCallback((state, action) => {
    switch (action.type) {
      case "showModal":
        return { ...state, isShowReportModal: true, ...action.payload };
      case "hiddenModal":
        return {
          ...state,
          isShowReportModal: false,
          typeReport: null,
          productCode: null,
          produceId: null,
        };
      default:
        return state;
    }
  }, []);

  const [modalFormState, modalFormDispatch] = useReducer(
    modalFormReducer,
    initialState
  );

  return (
    <ModalFormContext.Provider value={[modalFormState, modalFormDispatch]}>
      {children}
    </ModalFormContext.Provider>
  );
};

export { ModalFormStore };
