import AuthState from "../context/Auth/AuthState";
import FileState from "../context/File/FileState";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <FileState>
        <Component {...pageProps} />
      </FileState>
    </AuthState>
  );
}

export default MyApp;
