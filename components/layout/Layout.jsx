import React from "react";
import Head from "next/head";
import Header from "../Header";
import styles from "./../../styles/Layout.module.scss";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <html lang="es" />
        <title>Uri Send Files</title>
        <meta charset="utf-8" />
        <meta
          name="description"
          content="Web app para envio de cualquier tipo de archivo de internet con DropZone, protegido por password y eliminación del arhivo una vez cumplida la función"
        />
        <meta
          name="keywords"
          content="NodeSendUri, senduri, proyecto Node Send Uri"
        />
      </Head>
      <div className={styles.layout}>
        <Header />
        <div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
