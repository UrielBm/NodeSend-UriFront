import React, { useContext } from "react";
import Image from "next/image";
import NavBar from "./NavBar";
import Link from "next/link";
import FileContext from "../context/File/FileContext";
import { useRouter } from "next/router";
import styles from "./../styles/Layout.module.scss";
const Header = () => {
  const useFileContext = useContext(FileContext);
  const { handleCleanState } = useFileContext;
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/");
    handleCleanState();
  };
  return (
    <header className={styles.header}>
      <button className={styles.wrapperLogo} onClick={handleOnClick}>
        <h1 className={styles.title}>
          <span>Node</span>
          <span>Send</span>
          <span className={styles.dash}>-</span>
          <span>Uri</span>
        </h1>
        <Image src="/img/logo.svg" alt="Logo" width={35} height={35} />
      </button>

      <section className={styles.wrapperNav}>
        <NavBar />
      </section>
    </header>
  );
};

export default Header;
