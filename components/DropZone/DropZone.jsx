import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Subtitle from "../General/Subtitle";
import Spinner from "../General/Spinner";
import FileContext from "../../context/File/FileContext";
import AuthContext from "../../context/Auth/AuthContext";
import styles from "../../styles/DropZone.module.scss";
import FileForm from "../Forms/FileForm";
const DropZone = () => {
  const useFileContext = useContext(FileContext);
  const useAuthContext = useContext(AuthContext);
  const { ShowAlert, uploadFile, loading, handleCreateLink } = useFileContext;
  const { auth } = useAuthContext;
  const onDropRejected = () => {
    ShowAlert();
  };
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    // crear formData
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    uploadFile(formData, acceptedFiles[0].path);
  });
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 8000000 });
  return (
    <>
      <div className={styles.Dropzone}>
        {acceptedFiles.length > 0 ? (
          <div>
            <div>
              <Subtitle subtitle="Files" />
            </div>
            <ul className="wrapperFiles">
              {acceptedFiles.map((file) => {
                return (
                  <li className="Stylefile" key={file.lastModified}>
                    <p className="fileName">{file.path}</p>
                    <p className="fileSize">
                      {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
                    </p>
                  </li>
                );
              })}
            </ul>
            {loading ? (
              <div className="wrapperLoading">
                <p className="textLoading">Subiendo archivo</p>
                <Spinner />
              </div>
            ) : (
              <>
                {auth ? <FileForm /> : null}
                <button
                  className="buttonSelect"
                  type="button"
                  onClick={() => handleCreateLink()}
                >
                  Crear enlace para compartir
                </button>
              </>
            )}
          </div>
        ) : (
          <div {...getRootProps({ className: "dropzone" })}>
            <input className="input" {...getInputProps()} />
            {isDragActive ? (
              <p className="text"> suelta el archivo</p>
            ) : (
              <div className="wrapperText">
                <p className="text">Selecciona un archivo y arrastralo aquí</p>
                <button className="buttonSelect" type="button">
                  Selecciona archivos para subir
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .wrapperFiles {
          width: 100%;
          margin: 1rem 0;
        }
        .wrapperLoading {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .wrapperLoading .textLoading {
          font-size: 0.85rem;
          color: #1b1717;
        }
        .wrapperFiles .Stylefile {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          overflow: hidden;
          box-shadow: 2px 2px 2px 1px rgba(100, 99, 99, 0.2);
          border-radius: 0.8rem;
          font-family: "Roboto Mono", monospace;
        }
        .Stylefile .fileName {
          width:100%
          font-size: 0.95rem;
          color: #630000;
          font-weight: 500;
          overflow: hidden;
        }
        .Stylefile .fileSize {
          font-size: 0.8rem;
          font-weight: 400;
          color: #1b1717;
        }
        .dropzone {
          width: 100%;
          padding: 2rem 0;
        }
        .input {
          height: 100%;
          border: solid red;
        }
        .text {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .wrapperText {
          text-align: center;
        }
        .buttonSelect {
          width: 100%;
          border: none;
          border-radius: 0.8rem;
          padding: 0.3rem 1rem;
          font-size: 0.8rem;
          text-align: center;
          background-color: #630000;
          color: #eeebdd;
          transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;
        }
        .buttonSelect:hover {
          cursor: pointer;
          font-size: 0.95rem;
          color: #1b1717;
          background-color: #eeebdd;
        }
      `}</style>
    </>
  );
};

export default DropZone;
