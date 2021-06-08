import { useReducer } from "react";
import FileContext from "./FileContext";
import FileReducer from "./FileReducer";
import ClientAxios from "../../config/ClientAxios";
import Swal from "sweetalert2";
import {
  UPLOADFILES_RIGHT,
  CREATELINK_RIGHT,
  UPLOADFILES_WRONG,
  UPLOAD_FILE,
  CLEAN_STATE,
  ADD_PASSWORD,
  ADD_DOWNLOADS,
  VALIDATE_PASSWORD,
} from "../../Types";

const FileState = ({ children }) => {
  const InitialState = {
    name: null,
    original_name: null,
    loading: false,
    downloads: 1,
    password: null,
    author: null,
    url: "",
    validate: true,
  };
  //Creación del reducer
  const [state, dispatch] = useReducer(FileReducer, InitialState);
  //FUNCIONES
  const ShowAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Error al subir el archivo",
      text: `El tamaño maximo sin registro es de 2MB, intenta otra vez`,
    });
  };
  const uploadFile = async (data, fileName) => {
    dispatch({
      type: UPLOAD_FILE,
    });
    try {
      const response = await ClientAxios.post("/file/upload", data);
      dispatch({
        type: UPLOADFILES_RIGHT,
        payload: {
          name: response.data.file,
          original_name: fileName,
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al subir el archivo",
        text: `${error.response.data.msg}`,
      });
      dispatch({
        type: UPLOADFILES_WRONG,
      });
    }
  };
  const handleCreateLink = async () => {
    const file = {
      name: state.name,
      original_name: state.original_name,
      downloads: state.downloads,
      password: state.password,
      author: state.author,
    };
    try {
      const response = await ClientAxios.post("/link", file);
      dispatch({
        type: CREATELINK_RIGHT,
        payload: response.data.msg,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleVerifyPassword = async (password, url) => {
    try {
      const response = await ClientAxios.post(`/verify/${url}`, password);
      dispatch({
        type: VALIDATE_PASSWORD,
        payload: response.data.password,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error,en el password",
        text: `${error.response.data.msg}`,
      });
    }
  };
  const handleChangePassword = (value) => {
    dispatch({
      type: ADD_PASSWORD,
      payload: value,
    });
  };
  const handleSelectDownloads = (value) => {
    dispatch({
      type: ADD_DOWNLOADS,
      payload: value,
    });
  };
  const handleCleanState = () => {
    try {
      dispatch({
        type: CLEAN_STATE,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <FileContext.Provider
      value={{
        name: state.name,
        original_name: state.original_name,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        validate: state.validate,
        ShowAlert,
        uploadFile,
        handleCreateLink,
        handleVerifyPassword,
        handleChangePassword,
        handleSelectDownloads,
        handleCleanState,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
export default FileState;
