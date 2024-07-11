import React, { useState } from "react";
import PropTypes from "prop-types";
import "./navbar-button.scss";

const NavbarButton = ({
  text,
  tooltip,
  onClick,
  icon,
  isSelected,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`navbar-button ${className}`}>
      <button
        className={`navbar-button__button ${
          isSelected ? "navbar-button__button--selected" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {text && text}
        {icon && React.createElement(icon)}
      </button>
      {isHovered && <div className="navbar-button__tooltip">{tooltip}</div>}
    </div>
  );
};

NavbarButton.propTypes = {
  text: PropTypes.string,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.element,
  isSelected: PropTypes.bool,
  className: PropTypes.string,
};

export default NavbarButton;
