import { useAddProject } from "../../../db/useProject";
import { Menu } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useAddHistory } from "../../../db/useHistory";

const HistoryToolbar = () => {

  const addHistory = useAddHistory();

  const options = [
    {
      title: "New request",
      icon: <FileAddOutlined />,
      key: "add",
      label: "New request",
    },
  ];

  const handleMenuActions = ({ key }) => {
    if (key === "add") {
        addHistory({ method: "get", url: "http://hitman/api" });
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

export default HistoryToolbar;
