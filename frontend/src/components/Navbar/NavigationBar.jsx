import { Link } from "react-router-dom";
import "./NavigationBar.css"

const NavbarDos = () => {
    return (
        <div className="container-fluid">
             <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand">
                Navbar
            </Link>
            <form className="d-flex">
            <input className="form-control me-2 justify-content: space-between" type="search" placeholder="Search" aria-label="Search" id="buscador" />
            <button className="btn btn-outline-success" type="submit" id="btn-search">Search</button>
            </form>
        </div>
      </nav>
    </div>
    )
}

export default NavbarDos;

