import React, { useState } from "react";
import projects from "./Projects"; // Update the import path to the correct location
import "./ProjectSection.css";

const ProjectSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const handleDownloadClick = (link) => {
    window.open(link, "_blank"); // Open the link in a new tab to initiate the download
  };

  return (
    <div>
      <h1 className="projects-heading">
        <i className="fas fa-code"></i> My Projects
      </h1>
      <div className="navigation">
        <button onClick={() => handleCategoryClick("All")}>All</button>
        <button onClick={() => handleCategoryClick("MERN Apps")}>
          MERN Apps
        </button>
        <button onClick={() => handleCategoryClick("Data Science")}>
          Data Science
        </button>
        <button onClick={() => handleCategoryClick("Machine Learning")}>
          Machine Learning
        </button>
      </div>
      <div className="projects">
        {filteredProjects.map((project) => (
          <div className="project" key={project.id}>
            <img src={project.url} alt="error" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleDownloadClick(project.link)}>
              Download Code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
