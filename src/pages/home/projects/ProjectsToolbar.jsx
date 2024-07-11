import PropTypes from "prop-types";
import { useAddProject } from "../../../db/useProject";
import { Menu } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";

const ProjectsToolbar = () => {
  const addProject = useAddProject();

  const options = [
    {
      title: "New project",
      icon: <AppstoreAddOutlined />,
      key: "add",
      label: "New project",
    },
  ];

  const handleMenuActions = ({ key }) => {
    if (key === "add") {
      addProject({ name: "new project" });
    }
  };

  return (
    <div className="projects__toolbar">
      <Menu
        mode="horizontal"
        selectable={false}
        items={options}
        onClick={handleMenuActions}
      />
    </div>
  );
};

ProjectsToolbar.propTypes = {
  selectedProject: PropTypes.object,
};

export default ProjectsToolbar;
