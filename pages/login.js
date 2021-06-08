import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import Title from "../components/General/Title";
import Layout from "../components/layout/Layout";
import styles from "../styles/Pages.module.scss";
const login = () => {
  return (
    <Layout>
      <section className={styles.wrapperTitle}>
        <Title title="Login" />
      </section>
      <section className={styles.wrapperForm}>
        <LoginForm />
      </section>
    </Layout>
  );
};

export default login;
