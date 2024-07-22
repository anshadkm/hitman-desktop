import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HistoryCard from "../../../components/history-card/HistoryCard";
import "./project.scss";
import { useAddProject } from "../../../db/useProject";
import { useFind } from "use-pouchdb";
import { Button, Dropdown, Input } from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  RightOutlined,
  DownOutlined,
  MoreOutlined,
  DeleteOutlined,
  FileAddFilled,
} from "@ant-design/icons";
import { useAddRequest } from "../../../db/useRequest";

const Project = ({ project, className, onRequestSelect }) => {
  const name = project.name;

  const { docs: requests } = useFind({
    selector: {
      type: "request",
      projectId: project._id,
    },
  });

  return (
    <div>
      <ProjectName name={name} _id={project._id} className={className}>
        {requests.map((request, index) => (
          <HistoryCard
            key={index}
            history={request}
            onClick={() => onRequestSelect(request)}
          />
        ))}
      </ProjectName>
    </div>
  );
};

const ProjectName = ({ className, children, name, _id }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [isEdit, setEditMode] = useState(false);
  const [projectName, setProjectName] = useState();

  useEffect(() => {
    setProjectName(name);
  }, [name]);

  const addOrUpdateProject = useAddProject();
  const addRequest = useAddRequest();

  const addNewRequest = () => {
    addRequest({ projectId: _id, method: "get", url: "http://hitman/api" });
  }

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  const switchToEditMode = () => {
    setEditMode(true);
  };

  const save = () => {
    addOrUpdateProject({ _id, name: projectName });
    setEditMode(false);
  };

  const cancel = () => {
    setProjectName(name || "");
    setEditMode(false);
  };

  const projectOptions = [
    { label: "Edit", key: "edit-project", icon: <EditOutlined /> },
    {
      label: "Delete project",
      key: "delete-project",
      icon: <DeleteOutlined />,
      disabled: true,
    },
    { type: "divider" },
    { label: "Add request", key: "add-request", icon: <FileAddFilled /> },
  ];

  const handleProjectOptions = ({ key }) => {
    switch (key) {
      case "edit-project":
        switchToEditMode();
        break;
      case "add-request":
        addNewRequest();
        break;
    }
  };

  return (
    <div>
      <div className={`project-name ${className}`}>
        <div className="project-name__icon" onClick={toggleExpansion}>
          {isExpanded ? <DownOutlined /> : <RightOutlined />}
        </div>
        <div className="project-name__name">
          {!isEdit && <div>{name}</div>}
          {isEdit && (
            <Input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          )}
        </div>
        <div className="project-name__actions">
          {!isEdit && (
            <>
              <Dropdown
                menu={{
                  items: projectOptions,
                  selectable: false,
                  onClick: handleProjectOptions,
                }}
              >
                <Button size="small" icon={<MoreOutlined />}></Button>
              </Dropdown>
            </>
          )}
          {isEdit && (
            <>
              <Button size="small" onClick={save} icon={<SaveOutlined />} />
              <Button size="small" onClick={cancel} icon={<CloseOutlined />} />
            </>
          )}
        </div>
      </div>
      {isExpanded && <div>{children}</div>}
    </div>
  );
};

Project.propTypes = {
  project: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onRequestSelect: PropTypes.func,
};

ProjectName.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array,
  name: PropTypes.string,
  _id: PropTypes.string,
};

export default Project;
