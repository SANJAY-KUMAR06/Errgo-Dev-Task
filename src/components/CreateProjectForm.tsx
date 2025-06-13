import React, { useState } from "react";

const CreateProjectForm = ({ onCreateProject }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
const handleSubmit = (e) => {
  e.preventDefault();
  const techArray = techStack.split(',').map((tech) => tech.trim());
  const projectData = {
    title,
    description,
    techStack: techArray,
  };
    onCreateProject({ title, description, techStack: techArray });
    setTitle("");
    setDescription("");
    setTechStack("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow">
      <input
        className="w-full mb-2 p-2 border"
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="w-full mb-2 p-2 border"
        type="text"
        placeholder="Tech Stack (comma separated)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Project
      </button>
    </form>
  );
};

export default CreateProjectForm;
