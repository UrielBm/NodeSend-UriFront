import React, { useContext, useEffect, useState } from "react";
import PasswordForm from "../../components/Forms/PasswordForm";
import Subtitle from "../../components/General/Subtitle";
import Title from "../../components/General/Title";
import Layout from "../../components/layout/Layout";
import ClientAxios from "../../config/ClientAxios";
import FileContext from "../../context/File/FileContext";
import styles from "../../styles/Pages.module.scss";

export async function getServerSideProps({ params }) {
  const { link } = params;
  const resultado = await ClientAxios.get(`/link/${link}`);
  return {
    props: {
      link: resultado.data,
    },
  };
}
export async function getServerSidePaths() {
  const response = await ClientAxios.get("/links");
  return {
    paths: response.data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}
const link = ({ link }) => {
  console.log(link);
  const useFileContext = useContext(FileContext);
  const { validate } = useFileContext;
  const [hasPassword, sethasPassword] = useState(link.password);
  useEffect(() => {
    if (!validate) {
      sethasPassword(validate);
    }
  }, [validate]);
  return (
    <Layout>
      {hasPassword ? (
        <>
          <section className={styles.wrapperTitle}>
            <Subtitle subtitle="Ingresa el password" />
          </section>
          <section className={styles.wrapperForm}>
            <PasswordForm url={link.url} />
          </section>
        </>
      ) : (
        <>
          <section className={styles.wrapperTitle}>
            <Title title="Descarga tu archivo" />
          </section>
          <section className={styles.wrapperDownloads}>
            <a
              href={`${process.env.backendURL}/file/download/${link.file}`}
              className={styles.DownloadButton}
            >
              Descarga aquí
            </a>
          </section>
        </>
      )}
    </Layout>
  );
};
export default link;
