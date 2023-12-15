import { Link } from "react-router-dom";
import "./NavigationBar.css"
import { HiHome } from "react-icons/hi";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const NavbarDos = () => {
  const { logout } = useContext(AuthContext)
  
  return (
        <div className="container-fluid">
        <nav className="navbar bg-body-tertiary" id="navbar-container">
        <div className="container-fluid">
          <a className="navbar-brand">Posts</a>
            <ul className="nav">
                <li>
                  <Link title="Mis posts" className="nav-item" to="/post">
                   <HiHome />
                  </Link>
                </li>
                <li>
                  <Link title="Explora el mundo" className="nav-item" to="/allposts">
                  <PiAirplaneTiltFill />
                  </Link>
                  </li>
                <li>
                  <Link title="Cerrar sesión" className="nav-item" to="/login" onClick={logout}>
                  <TbLogout />
                  </Link>
                  </li> 
            </ul>
        </div>
      </nav>
      </div>
    )
};

export default NavbarDos;