import React from "react";

const AuthContext = React.createContext({
  isLogIn: null,
  tokenInLocalStorage: "",
  txt: "",
  setInStorageHandler: () => {},
  logOutHandler: () => {},
});

export function AuthContextProvider(props) {
  const [tokenInLocalStorage, setTokenInLocalStorage] = React.useState(
    localStorage.getItem("userToken") || ""
  );

  // set the user toker after logIn
  const setInStorageHandler = (token) => setTokenInLocalStorage(token);

  // Remove the user Token to logOut
  const logOutHandler = () => {
    localStorage.removeItem("userToken");
    setTokenInLocalStorage("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogIn: false,
        txt: "Edgar Text",
        setInStorageHandler: setInStorageHandler,
        tokenInLocalStorage: tokenInLocalStorage,
        logOutHandler: logOutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
