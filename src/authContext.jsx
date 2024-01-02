import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("authState") || false,
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // Update state
      const newState = {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
      localStorage.setItem('authState', JSON.stringify(newState));

      return newState;
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch(
      {
      type: "Logout",
    }
    );
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const TokenValidity = async() => {
      try{
        const role = localStorage.getItem("role");
        await sdk.check(role);
      }
      catch (error){
        tokenExpireError(dispatch, error.errorMessage)
      }
    }
    TokenValidity();
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
