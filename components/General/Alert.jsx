import React, { useContext } from "react";
import AuthContext from "../../context/Auth/AuthContext";
const Alert = () => {
  const useAuthContext = useContext(AuthContext);
  const { msg } = useAuthContext;
  return (
    <>
      <div className={msg.status === 200 ? "alertRight" : "alertDanger"}>
        <p>{msg.text}</p>
      </div>
      <style jsx>{`
        div {
          width: 100%;
          padding: 1rem;
          text-align: center;
          color: white;
          font-weight: 300;
          font-size: 0.9rem;
          border-radius: 0.8rem;
        }
        .alertRight {
          background-color: #5e8b7e;
        }
        .alertDanger {
          background-color: #630000;
        }
      `}</style>
    </>
  );
};

export default Alert;
