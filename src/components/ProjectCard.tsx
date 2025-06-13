import React from "react";

type Project = {
  _id: string;
  title: string;
  description?: string;
  techStack?: string[];
  createdAt?: string; // ✅ Add this line
};

type ProjectCardProps = {
  project: Project;
  onDelete?: (id: string) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  if (!project || !project.title) return null;

  const createdDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString()
    : 'N/A';

  return (
    <div className="bg-white p-4 shadow-md rounded">
      <div className="flex justify-between items-center mb-2">
        <div className="text-2xl font-bold">{project.title}</div>
        {onDelete && (
          <button
            onClick={() => onDelete(project._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        )}
      </div>

      {project.description && <p className="text-gray-700">{project.description}</p>}

      {project.techStack?.length > 0 && (
        <div className="mt-2 text-sm text-gray-500">
          Tech Stack: {project.techStack.join(", ")}
        </div>
      )}

      <p className="mt-2 text-xs text-gray-400">📅 Created: {createdDate}</p>
    </div>
  );
};

export default ProjectCard;
