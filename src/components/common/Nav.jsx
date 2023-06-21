import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navigation">
      <NavLink to="/" className="nav-link">
        Genres
      </NavLink>
      <NavLink to="/movies/catalog" className="nav-link">
        Movies
      </NavLink>
      <NavLink to="/about" className="nav-link">
        About Us
      </NavLink>
    </nav>
  );
};

export default Nav;
