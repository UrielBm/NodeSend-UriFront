import ClientAxios from "./ClientAxios";

// Authorization
const TokenAuth = (token) => {
  if (token) {
    ClientAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete ClientAxios.defaults.headers.common["Authorization"];
  }
};
export default TokenAuth;
