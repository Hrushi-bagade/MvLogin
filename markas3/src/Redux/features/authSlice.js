import User from "@/Models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import Router from "next/router";
import APIService from "@/utils/APIService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { businessUnit } from "./businessUnitSlice";
import { SetDataInLocalStorage } from "@/utils/GetSetToken";

const initialState = {
  isAuthenticated: false,
  username: "",
  password: "",
  uid: "",
  token: "",
  userId: 0,
  businessUnitId: 1,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
    logInSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.userName;
      state.uid = action.payload.displayName || "";
      state.password = "";
      state.token = action.payload.token;
      state.userId = action.payload.id;
    },
  },
});

export default auth.reducer;

// Actions
export const { logOut, logInSuccess } = auth.actions;
// Async action using Redux Thunk
export const logIn = (userData) => async (dispatch) => {
  try {
    let model = {
      userName: userData.userName,
      password: userData.password,
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      isSystem: false,
      displayName: "",
      token: "",
      createdBy: "",
      updatedBy: 1,
      isActive: false,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    const user = await APIService.POST("User/Get", model, userData.token);

    if (!user.success) {
      toast.error(
        "Something went wrong with the user fetch.\n" + user.message
      );
      return;
    }
    const User = user.data;
    localStorage.setItem("userId", User.id.toString());
    localStorage.setItem("BuId", User.businessUnit?.id?.toString() || "");
    localStorage.setItem("BuName", User.businessUnit?.name?.toString() || "");
    dispatch(logInSuccess(User));
    //Router.push("/Dashboard");
  } catch (error) {
    //dispatch(logInFailure(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("jsonwebtoken");
    localStorage.removeItem("userId");
    localStorage.removeItem("BuId");
    localStorage.removeItem("User Name");
    localStorage.removeItem("Buid");
    dispatch(logOut());
    window.location.href = "/";
  } catch (error) {
    console.error("Error while logging out:", error);
  }
};
