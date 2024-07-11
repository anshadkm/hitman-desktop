import PropTypes from "prop-types";
import "./side-panel.scss";

const SidePanel = ({ children }) => {
  return <div className="side-panel">{children}</div>;
};

SidePanel.propTypes = {
  children: PropTypes.element,
};

export default SidePanel;
