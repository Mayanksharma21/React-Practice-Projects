import React from "react";
import { useDispatch } from "react-redux";
import authService, { AuthService } from "../../appwriteServices/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}>
      Log out
    </button>
  );
};

export default LogoutBtn;
