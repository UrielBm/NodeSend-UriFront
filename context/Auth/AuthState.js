import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import ClientAxios from "../../config/ClientAxios";
import TokenAuth from "../../config/TokenAurh";
import Swal from "sweetalert2";
import {
  REGISTER_RIGHT,
  REGISTER_WRONG,
  CLEAN_ALERT,
  LOGIN_RIGHT,
  LOGIN_WRONG,
  GET_USER,
  LOGOUT,
} from "../../Types";
const AuthState = ({ children }) => {
  const InitialState = {
    token:
      typeof window !== "undefined" ? localStorage.getItem("loginToken") : "",
    auth: null,
    user: null,
    msg: null,
  };
  // CREACION DEL REDUCER
  const [state, dispatch] = useReducer(AuthReducer, InitialState);
  // CREACION DE LAS FUNCIONES
  const registerUser = async (user) => {
    const msg = {
      status: null,
      text: null,
    };
    try {
      const register = await ClientAxios.post("/user/createuser", user);
      msg.status = register.status;
      msg.text = register.data.msg;
      dispatch({
        type: REGISTER_RIGHT,
        payload: msg,
      });
      Swal.fire(
        "Registro realizado",
        "Se realizo el registro correctamente",
        "success"
      );
    } catch (error) {
      msg.status = error.response.status;
      msg.text = error.response.data.msg;
      dispatch({
        type: REGISTER_WRONG,
        payload: msg,
      });
      //alert error
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: "Hubo un error al registrar el nuevo usuario",
      });
    }
    //  CLEAN ALERT
    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT,
        payload: null,
      });
    }, 4000);
  };
  const login = async (user) => {
    const msg = {
      status: null,
      text: null,
    };
    try {
      const response = await ClientAxios.post("/auth", user);
      const { token } = response.data;
      dispatch({
        type: LOGIN_RIGHT,
        payload: token,
      });
    } catch (error) {
      msg.status = error.response.status;
      msg.text = error.response.data.msg;
      //alert error
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: `${msg.text}`,
      });
      dispatch({
        type: LOGIN_WRONG,
        payload: msg,
      });
    }
  };
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  const getUser = async () => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      TokenAuth(token);
    }
    try {
      const response = await ClientAxios.get("/auth/user");
      const { user } = response.data;
      if (user) {
        dispatch({
          type: GET_USER,
          payload: user,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        msg: state.msg,
        registerUser,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
