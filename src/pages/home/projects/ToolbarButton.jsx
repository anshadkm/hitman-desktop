import React, { useState } from "react";
import PropTypes from "prop-types";
import "./toolbar-button.scss";

const ToolbarButton = ({
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
    <div className={`toolbar-button ${className}`}>
      <button
        className={`toolbar-button__button ${
          isSelected ? "toolbar-button__button--selected" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {text && text}
        {icon && React.createElement(icon)}
      </button>
      {isHovered && <div className="toolbar-button__tooltip">{tooltip}</div>}
    </div>
  );
};

ToolbarButton.propTypes = {
  text: PropTypes.string,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.element,
  isSelected: PropTypes.bool,
  className: PropTypes.string,
};

export default ToolbarButton;
