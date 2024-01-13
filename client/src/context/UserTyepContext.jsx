import React, { useState, createContext, useEffect, useContext } from "react";

export const UserTypeContext = createContext();

export const TypeProvider = ({ children }) => {
  const [userType, setUserType] = useState("user");

//   const darkThemeLocal = localStorage.getItem("mockapi-theme");

//   useEffect(() => {
//     // console.log(JSON.stringify(darkThemeLocal), "true");
//     if (darkThemeLocal === "true") {
//       setDarkTheme(true);
//     }
//   }, [darkThemeLocal]);

  return (
    <UserTypeContext.Provider value={[userType, setUserType]}>
      {children}
    </UserTypeContext.Provider>
  );
};
export const useUserTypeContext=()=>useContext(UserTypeContext)