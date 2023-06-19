import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-center pt-3 mb-4 divide-x-2 divide-white">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/movies/list" className="nav-link">
        Movies
      </NavLink>
      <NavLink to="/about" className="nav-link">
        About Us
      </NavLink>
    </nav>
  );
};

export default Nav;
