import React from 'react';
import {
  Home,
  FolderOpen,
  Users,
  Image,
  Settings,
  Search,
  MessageSquare,
  User,
  Plus,
  Radar,
  LayoutTemplate,UploadCloud
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); 

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: UploadCloud, label: 'Deployments', path: '/deployments' },
    { icon: Image, label: 'Usage', path: '/usage' },
    { icon: Settings, label: 'Items', path: '/items' },
    { icon: Search, label: 'Docs', path: '/docs' },
    { icon: Radar, label: 'Discover Workspace', path: '/discover' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
    
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-medium text-gray-900" >ERRGO's SPACE</span>
        </div>

        <Link to="/">
          <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
            <Plus size={16} />
            Create Project
          </button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-700 transition-colors">
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
