import React from "react";

const statusColors: Record<string, string> = {
  pending: "text-yellow-600",
  success: "text-green-600",
  failed: "text-red-600",
};

const DeploymentCard: React.FC<{ deployment: any }> = ({ deployment }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{deployment.name}</h3>
        <span className={`capitalize font-medium ${statusColors[deployment.status]}`}>
          {deployment.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">Env: {deployment.environment}</p>
      {deployment.version && <p className="text-sm text-gray-600">Version: {deployment.version}</p>}
      <p className="text-xs text-gray-400">📅 {new Date(deployment.deployedAt).toLocaleString()}</p>
    </div>
  );
};

export default DeploymentCard;
