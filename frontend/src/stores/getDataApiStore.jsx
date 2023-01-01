import { useReducer, createContext, useCallback } from "react";
import { CREATE_TYPE, GET_TYPE } from "../config/pageName";

const initialState = {
  pageName: null,
  data: null,
  getDataAPI: null,
};

export const GetDataAPIContext = createContext(initialState);

const GetDataAPIStore = ({ children }) => {
  const getDataAPIReducer = useCallback((state, action) => {
    switch (action.type) {
      case GET_TYPE: {
        return {
          ...state,
          ...action.payload,
        };
      }
      default:
        return state;
    }
  }, []);

  const [getDataAPIState, getDataAPIDispatch] = useReducer(
    getDataAPIReducer,
    initialState
  );

  const customDispatch = useCallback(
    async (action) => {
      switch (action.type) {
        case CREATE_TYPE:
          {
            const data = await action.payload.getDataAPI();
            console.log("da", data);
            getDataAPIDispatch({
              type: GET_TYPE,
              payload: { ...action.payload, data },
            });
          }
          break;
        case GET_TYPE:
          {
            const data = await getDataAPIState.getDataAPI();
            console.log("db", data);
            getDataAPIDispatch({
              type: GET_TYPE,
              payload: { ...action.payload, data },
            });
          }
          break;
        default:
          break;
      }
    },
    [getDataAPIState]
  );

  console.log("first", getDataAPIState);

  return (
    <GetDataAPIContext.Provider
      value={{ getDataAPIState, getDataAPIDispatch: customDispatch }}
    >
      {children}
    </GetDataAPIContext.Provider>
  );
};

export { GetDataAPIStore };
