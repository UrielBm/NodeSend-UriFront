import React, { useContext, useState } from "react";
import FileContext from "../../context/File/FileContext";
import styles from "../../styles/Form.module.scss";
const FileForm = () => {
  const useFileContext = useContext(FileContext);
  const { handleChangePassword, handleSelectDownloads, downloads } =
    useFileContext;
  const [hasPassword, sethasPassword] = useState(false);
  const handleSelectChange = (e) => {
    const { value } = e.target;
    handleSelectDownloads(value);
  };
  const handleChange = (e) => {
    let { value } = e.target;
    value = parseInt(value);
    handleChangePassword(value);
  };
  return (
    <form className={styles.formFile}>
      <div className={styles.wrapperSelect}>
        <label className={styles.labeltext}>Eliminar despues de:</label>
        <select
          className={styles.selectFormFile}
          onChange={handleSelectChange}
          value={downloads}
        >
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="15">15 Descargas</option>
        </select>
      </div>
      <div className={styles.wrapperSelect}>
        <div className={styles.wrapperLabelPassword}>
          <label className={styles.labeltext}>Proteger con contraseña:</label>
          <input
            type="checkbox"
            onChange={() => sethasPassword(!hasPassword)}
          />
        </div>
        {hasPassword && (
          <input
            type="password"
            placeholder="input a password"
            className={styles.inputPassword}
            onChange={handleChange}
          />
        )}
      </div>
    </form>
  );
};

export default FileForm;
