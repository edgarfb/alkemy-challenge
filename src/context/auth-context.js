import React from "react";

const AuthContext = React.createContext({
  isLogIn: null,
  tokenInLocalStorage: "",
  displayModal: null,
  setInStorageHandler: () => {},
  logOutHandler: () => {},
  showModal: () => {},
  hideModal: () => {},
});

export function AuthContextProvider(props) {
  const [tokenInLocalStorage, setTokenInLocalStorage] = React.useState(
    localStorage.getItem("userToken") || ""
  );
  const [displayModal, setDisplayModal] = React.useState(null);
  // this is working but need to find if can I put it on a diferent context

  const showModal = () => setDisplayModal(true);
  const hideModal = () => setDisplayModal(false);

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
        displayModal: displayModal,
        setInStorageHandler: setInStorageHandler,
        tokenInLocalStorage: tokenInLocalStorage,
        logOutHandler: logOutHandler,
        showModal,
        hideModal,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
