import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./projects.scss";
import ProjectsToolbar from "./ProjectsToolbar";
import Project from "./Project";
import { useFind } from "use-pouchdb";

const Projects = ({ onRequestSelect }) => {
  const { docs: projects } = useFind({
    selector: {
      type: "project",
      //method: { $exists: true },
    },
  });

  console.log("Projects", projects);

  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    if (projects && projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  return (
    <div className="projects">
      <ProjectsToolbar selectedProject={selectedProject} />
      <div className="projects__listing">
        {/*<Tree>
          <Tree.TreeNode title="P1">
            <Tree.TreeNode title="P2" />
          </Tree.TreeNode>
  </Tree>*/}
        {projects.map((project, index) => (
          <Project
            key={index}
            project={project}
            onClick={(project) => setSelectedProject(project)}
            onRequestSelect={onRequestSelect}
            className={`${
              project === selectedProject ? "projects__selected" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

Projects.propTypes = {
  onRequestSelect: PropTypes.func,
};

export default Projects;
