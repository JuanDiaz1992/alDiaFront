import { createContext, useReducer } from "react";

const initialState = {
  isChange: false,
};

export const HomeChangeContext = createContext(); // Export explícito

const homeChangeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        isChange: true,
      };
    case "RESET":
      return {
        ...state,
        isChange: false,
      };
    default:
      return state;
  }
};

export const HomeChangeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(homeChangeReducer, initialState);

  return (
    <HomeChangeContext.Provider value={{ state, dispatch }}>
      {children}
    </HomeChangeContext.Provider>
  );
};
