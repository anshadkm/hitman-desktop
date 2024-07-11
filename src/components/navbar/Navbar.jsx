import PropTypes from "prop-types";

import "./navbar.scss";

const Navbar = ({ children }) => {
  return <div className="navbar">{children}</div>;
};

Navbar.propTypes = {
  children: PropTypes.element,
};

export default Navbar;
