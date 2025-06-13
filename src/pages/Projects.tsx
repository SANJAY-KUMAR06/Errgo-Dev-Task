import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';

type Project = {
  _id: string;
  title: string;
  description?: string;
  techStack?: string[];
  createdAt?: string;
};

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <main className="flex-1 p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-purple-700 text-center"> All Projects</h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 text-center">No projects available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;
