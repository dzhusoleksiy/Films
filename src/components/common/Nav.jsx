import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-around mt-[10px] sm:mt-[20px] md:mt-[30px] lg:mt-[40px]">
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
