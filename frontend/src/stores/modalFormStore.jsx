import { useReducer, createContext, useCallback } from "react";
import { HIDDEN_MODAL_FORM, SHOW_MODAL_FORM } from "../config/modalFormType";

const initialState = {
  isShowModalForm: false,
  type: null,
  data: null,
};
export const ModalFormContext = createContext(initialState);

const ModalFormStore = ({ children }) => {
  const modalFormReducer = useCallback((state, action) => {
    switch (action.type) {
      case SHOW_MODAL_FORM:
        return { ...state, isShowModalForm: true, ...action.payload };
      case HIDDEN_MODAL_FORM:
        return {
          ...state,
          isShowModalForm: false,
          type: null,
          data: null,
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
    <ModalFormContext.Provider value={{ modalFormState, modalFormDispatch }}>
      {children}
    </ModalFormContext.Provider>
  );
};

export { ModalFormStore };
