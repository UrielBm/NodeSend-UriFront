import React, { useContext } from "react";
import { useFormik } from "formik";
import FileContext from "../../context/File/FileContext";
import * as Yup from "yup";
import styles from "../../styles/Form.module.scss";
const PasswordForm = ({ url }) => {
  const useFileContext = useContext(FileContext);
  const { handleVerifyPassword } = useFileContext;
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("es necesario un password"),
    }),
    onSubmit: (password) => {
      handleVerifyPassword(password, url);
    },
  });
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
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
        <button type="submit">Verificar Password</button>
      </div>
    </form>
  );
};

export default PasswordForm;
