import PropTypes from "prop-types";
import "./side-navbar.scss";
import { useState } from "react";
import Projects from "../../pages/home/projects/Projects";
import History from "../../pages/home/history/History";
import { Menu } from "antd";
import {
  ProfileOutlined,
  HistoryOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import Profiles from "../../pages/home/profile/Profiles";

const SideNavbar = ({ onChange, onSelectionChanged }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = [
    {
      title: "Projects",
      icon: <ProfileOutlined />,
      key: "0",
      label: "Projects",
    },
    { title: "History", icon: <HistoryOutlined />, key: "1", label: "History" },
    {
      title: "Profiles",
      icon: <IdcardOutlined />,
      key: "2",
      label: "Profiles",
    },
  ];

  const renderSidePanelContent = () => {
    if (selectedIndex == "0") {
      return <Projects onRequestSelect={onSelectionChanged} />;
    } else if (selectedIndex == "1") {
      return <History onRequestSelectionChanged={onSelectionChanged} />;
    } else if (selectedIndex == "2") {
      return <Profiles onProfileChanged={onSelectionChanged} />;
    }
  };

  return (
    <div className="side-navbar">
      <div className="side-navbar__menu">
        <Menu
          items={options}
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={({ key }) => {
            setSelectedIndex(key);
            onChange(key);
          }}
        />
      </div>
      <div className="side-navbar__side-panel">{renderSidePanelContent()}</div>
    </div>
  );
};

SideNavbar.propTypes = {
  onChange: PropTypes.func,
  onRequestSelectionChanged: PropTypes.func,
};

export default SideNavbar;
