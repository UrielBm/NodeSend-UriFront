import React from "react";
import Title from "../components/General/Title";
import RegisterForm from "../components/Forms/RegisterForm";
import Layout from "../components/layout/Layout";
import styles from "../styles/Pages.module.scss";
const register = () => {
  return (
    <Layout>
      <section>
        <section className={styles.wrapperTitle}>
          <Title title="Registro" />
        </section>
        <section className={styles.wrapperForm}>
          <RegisterForm />
        </section>
      </section>
    </Layout>
  );
};

export default register;
