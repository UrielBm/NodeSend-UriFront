import React, { useContext, useEffect } from "react";
import AuthContext from "../context/Auth/AuthContext";
import Link from "next/link";
import styles from "./../styles/Layout.module.scss";
const NavBar = () => {
  const useAuthContext = useContext(AuthContext);
  const { getUser, user, logout } = useAuthContext;
  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      getUser();
    }
  }, []);
  const handleOnClick = () => {
    logout();
  };
  return (
    <nav className={styles.nav}>
      {user ? (
        <>
          <p className={styles.name}>Hola: {user.name}</p>
          <button type="button" className={styles.link} onClick={handleOnClick}>
            Logout
          </button>
        </>
      ) : (
        <>
          {" "}
          <Link href="/login">
            <p className={styles.link}>Login</p>
          </Link>
          <Link href="/register">
            <p className={styles.link}>Sing in</p>
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
