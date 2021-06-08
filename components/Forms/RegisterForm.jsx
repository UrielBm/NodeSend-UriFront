import React, { useContext } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../General/Alert";
import styles from "../../styles/Form.module.scss";
const RegisterForm = () => {
  const useAuthContext = useContext(AuthContext);
  const { registerUser, msg } = useAuthContext;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("es necesario tu user name"),
      email: Yup.string()
        .email("Ingresa un email valido")
        .required("es necesario tu email"),
      password: Yup.string()
        .min(6, "el password debe de ser al menos 6 caracteres")
        .required("es necesario un password"),
    }),
    onSubmit: (user) => {
      registerUser(user);
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
          <label htmlFor="name">
            <span>Name</span>
          </label>
          <input
            type="text"
            placeholder="User Name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.wrapperFormError}>
            <p>Errors:</p>
            <p className={styles.errors}>{formik.errors.name}</p>
          </div>
        ) : null}
      </div>
      <div className={styles.wrapperFormData}>
        <div className={styles.wrapperInput}>
          <label htmlFor="email">
            <span>Email</span>
          </label>
          <input
            type="email"
            placeholder="example@example.com"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.wrapperFormError}>
            <p>Errors:</p>
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
        <button type="submit">Sing in</button>
      </div>
    </form>
  );
};

export default RegisterForm;
