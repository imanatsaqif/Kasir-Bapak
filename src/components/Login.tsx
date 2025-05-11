// src/components/Login.tsx
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import file CSS
import StethoscopeLogo from "../images/stethoscope-svgrepo-com.svg"; // Import logo
import GoogleButton from "../images/web_neutral_rd_SI.svg"; // Import Google button

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/kasir"); // Redirect ke halaman kasir setelah login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={StethoscopeLogo} alt="Logo" className="logo" />
        <h1 className="login-title">
          <span className="kasir-text">Kasir</span>
          <span className="bapak-text">Bapak</span>
        </h1>
      </div>
      <img
        src={GoogleButton}
        alt="Sign in with Google"
        className="google-button"
        onClick={handleLogin}
      />
    </div>
  );
};

export default Login;