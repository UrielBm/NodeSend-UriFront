import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import Alert from "../General/Alert";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../../styles/Form.module.scss";
const LoginForm = () => {
  const useAuthContext = useContext(AuthContext);
  const { msg, login, auth } = useAuthContext;
  //NEXT ROUTER
  const router = useRouter();
  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, [auth]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Ingresa un email valido")
        .required("es necesario el email"),
      password: Yup.string().required("es necesario el password"),
    }),
    onSubmit: (user) => {
      login(user);
    },
  });
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      {msg ? (
        <div className={styles.formWrapperAlert}>
          <Alert />
        </div>
      ) : null}
      <div className={styles.wrapperFormData}>
        <div className={styles.wrapperInput}>
          <label htmlFor="email">
            <span>Email</span>
          </label>
          <input
            type="email"
            placeholder="explace@exple.com"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.wrapperFormError}>
            <p>Error:</p>
            <p className={styles.errors}>{formik.errors.email}</p>
          </div>
        ) : null}
      </div>
      <div className={styles.wrapperFormData}>
        <div className={styles.wrapperInput}>
          <label htmlFor="password">
            <span>Password</span>
          </label>
          <input
            type="password"
            placeholder="a password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.wrapperFormError}>
            <p>Errors:</p>
            <p className={styles.errors}>{formik.errors.password}</p>
          </div>
        ) : null}
      </div>
      <div className={styles.wrapperFormData}>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
