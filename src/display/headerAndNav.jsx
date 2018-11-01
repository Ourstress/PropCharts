import React from "react";
import UserLogInLogOut from "./userLogInLogOut";
import { AuthContextProvider } from "../article/AuthContext";

const HeaderAndNav = () => {
  return (
    <AuthContextProvider>
      <UserLogInLogOut />
    </AuthContextProvider>
  );
};

export default HeaderAndNav;
