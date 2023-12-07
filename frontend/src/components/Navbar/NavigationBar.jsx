import { Link } from "react-router-dom";
import "./NavigationBar.css"

const NavbarDos = () => {
    return (
        <div className="container-fluid">
        <nav className="navbar bg-body-tertiary" id="navbar-container">
        <div className="container-fluid">
          <a className="navbar-brand">Posts</a>
            <ul className="nav">
                <Link className="nav-item" to="/post">Inicio</Link>
            </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" id="input-search" />
            <button className="btn btn-outline-success" type="submit" id="btn-search">Search</button>
          </form>
        </div>
      </nav>
      </div>
    )
};

export default NavbarDos;