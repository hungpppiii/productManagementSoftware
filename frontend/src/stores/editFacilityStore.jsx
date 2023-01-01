import { useReducer, createContext, useCallback } from "react";

const initialState = {
  isShowEditFacilityModal: false,
  typeEditFacility: null,
  data: null,
};

export const EditFacilityContext = createContext(initialState);

const EditFacilityStore = ({ children }) => {
  const reportReducer = useCallback((state, action) => {
    switch (action.type) {
      case "showEditFacilityModal":
        return { ...state, isShowEditFacilityModal: true, ...action?.payload };
      case "hiddenEditFacilityModal":
        return {
          ...state,
          isShowEditFacilityModal: false,
          typeEditFacility: null,
          data: null,
        };
      default:
        return state;
    }
  }, []);

  const [editFacilityState, editFacilityDispatch] = useReducer(
    reportReducer,
    initialState
  );

  return (
    <EditFacilityContext.Provider
      value={[editFacilityState, editFacilityDispatch]}
    >
      {children}
    </EditFacilityContext.Provider>
  );
};

export { EditFacilityStore };
