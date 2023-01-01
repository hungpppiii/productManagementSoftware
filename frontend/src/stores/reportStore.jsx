import { useReducer, createContext, useCallback } from "react";

const initialState = {
  isShowReportModal: false,
  typeReport: null,
  productCode: null,
  produceId: null,
};

export const ReportContext = createContext(initialState);

const ReportStore = ({ children }) => {
  const reportReducer = useCallback((state, action) => {
    switch (action.type) {
      case "showReportModal":
        return { ...state, isShowReportModal: true, ...action.payload };
      case "hiddenReportModal":
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

  const [reportState, reportDispatch] = useReducer(reportReducer, initialState);

  return (
    <ReportContext.Provider value={[reportState, reportDispatch]}>
      {children}
    </ReportContext.Provider>
  );
};

export { ReportStore };
