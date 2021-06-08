import { useContext, useEffect } from "react";
import AuthContext from "../context/Auth/AuthContext";
import FileContext from "../context/File/FileContext";
import Layout from "../components/layout/Layout";
import Title from "../components/General/Title";
import Subtitle from "../components/General/Subtitle";
import DropZone from "../components/DropZone/DropZone";
import Link from "next/link";
import styles from "../styles/Pages.module.scss";
export default function Home() {
  const useAuthContext = useContext(AuthContext);
  const useFileContext = useContext(FileContext);
  const { getUser } = useAuthContext;
  const { url } = useFileContext;
  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      getUser();
    }
  }, []);
  return (
    <Layout>
      <section className={styles.wrapperTitle}>
        <Title title="Home" />
      </section>
      {url ? (
        <div className={styles.wrapperIndexUrl}>
          <Subtitle subtitle="Tu URL es:" />
          <p
            className={styles.urlText}
          >{`${process.env.frontendURL}/links/${url}`}</p>
          <button
            type="button"
            className={styles.urlButton}
            onClick={() =>
              navigator.clipboard.writeText(
                `${process.env.frontendURL}/links/${url}`
              )
            }
          >
            Copiar enlace
          </button>
        </div>
      ) : (
        <section className={styles.wrapperIndex}>
          <section className={styles.wrapperDropZone}>
            <DropZone />
          </section>
          <section className={styles.wrapperDescription}>
            <Subtitle subtitle="Comparte archivos de forma sencilla con nodeSend-Uri" />
            <p>
              <span className={styles.companyName}>Nodesend-Uri</span> Es una
              app web para compartir archivos de cualquier tipo, con diferentes
              personas de forma sencilla atravez de un link que nosotros
              generamos, evitanto la perdida de calidad o compresión de archivos
              una vez finalizada la descarga tus archivos desaparecen de
              nuestros registros.
            </p>
            <Link href={"/register"}>
              <a className={styles.indexLink}>Registrate para más beneficios</a>
            </Link>
          </section>
        </section>
      )}
    </Layout>
  );
}
