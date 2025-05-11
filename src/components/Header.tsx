// src/components/Header.tsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import StethoscopeLogo from "../images/stethoscope-svgrepo-com.svg";
import LogOutLogo from "../images/log-out.svg";

interface HeaderProps {
  activePage: 'kasir' | 'inventory';
}

const Header = ({ activePage }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="header-container">
      <button className="logo-button">
        <img src={StethoscopeLogo} alt="Logo" className="button-img" />
      </button>
      
      <button 
        className={`nav-button ${activePage === 'kasir' ? 'active' : ''}`}
        onClick={() => navigate("/kasir")}
      >
        Halaman Kasir
      </button>
      
      <button 
        className={`nav-button ${activePage === 'inventory' ? 'active' : ''}`}
        onClick={() => navigate("/inventory")}
      >
        Halaman Inventory
      </button>
      
      <button className="logout-button" onClick={handleLogout}>
        <img src={LogOutLogo} className="button-img" alt="Logout" />
      </button>
    </div>
  );
};

export default Header;