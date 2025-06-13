import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import CreateProjectForm from "@/components/CreateProjectForm";
import ProjectCard from "@/components/ProjectCard";

const Index = () => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const [recentRes, allRes] = await Promise.all([
        axios.get("http://localhost:5000/api/projects/recent"),
        axios.get("http://localhost:5000/api/projects"),
      ]);
      setRecentProjects(recentRes.data);
      setAllProjects(allRes.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (projectData) => {
    try {
      await axios.post("http://localhost:5000/api/projects", projectData);
      fetchProjects(); // Refresh projects
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      fetchProjects(); // Refresh
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <CreateProjectForm onCreateProject={handleCreateProject} />

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Projects</h2>
            {loading ? (
              <p>Loading...</p>
            ) : recentProjects.length === 0 ? (
              <p>No recent projects found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} onDelete={handleDeleteProject} />
                ))}
              </div>
            )}
          </section>

          
        </div>
      </div>
    </div>
  );
};

export default Index;
