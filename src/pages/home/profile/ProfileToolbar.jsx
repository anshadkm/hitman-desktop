import PropTypes from "prop-types";
import { Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useProfile } from "../../../db/useProfile";

const ProfileToolbar = () => {
  const addProfile = useProfile();

  const options = [
    {
      title: "New profile",
      icon: <PlusOutlined />,
      key: "add",
      label: "New profile",
    },
  ];

  const handleMenuActions = ({ key }) => {
    if (key === "add") {
      addProfile({ name: "new profile" });
    }
  };

  return (
    <div className="profile__toolbar">
      <Menu
        mode="horizontal"
        selectable={false}
        items={options}
        onClick={handleMenuActions}
      />
    </div>
  );
};

ProfileToolbar.propTypes = {
  selectedProject: PropTypes.object,
};

export default ProfileToolbar;
