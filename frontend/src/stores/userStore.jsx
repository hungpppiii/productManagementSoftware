import { useReducer, createContext, useCallback } from "react";

const initialState = {
  email: null,
  imageURL: null,
  name: null,
  type: null,
};

export const UserContext = createContext(initialState);

const UserStore = ({ children }) => {
  const UserReducer = useCallback((state, action) => {
    switch (action.type) {
      case "login":
        return { ...action.payload };
      case "logout":
        return {
          ...initialState,
        };
      default:
        return state;
    }
  }, []);

  const [userState, userDispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={[userState, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserStore };
