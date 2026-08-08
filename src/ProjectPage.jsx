import { useParams } from "react-router-dom";
import ProjectDetails from "./components/ProjectDetails";
import { myProjects } from "./constants";

// In charge of opening a new Project Page with Project Details
const ProjectPage = () => {
  const { slug } = useParams();

  const project = myProjects.find((p) => p.slug === slug);

  if (!project) {
    return <h1 className="text-white p-10">Project not found.</h1>;
  }

  return <ProjectDetails {...project} />;
};

export default ProjectPage;