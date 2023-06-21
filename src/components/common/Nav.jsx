import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navigation">
      <NavLink to="/Films/Genres" className="nav-link">
        Genres
      </NavLink>
      <NavLink to="/Films/Catalog" className="nav-link">
        Movies
      </NavLink>
      <NavLink to="/Films/About-Us" className="nav-link">
        About Us
      </NavLink>
    </nav>
  );
};

export default Nav;
