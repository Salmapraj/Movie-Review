// src/components/SideMenuBar.jsx
import React from "react";
import { Home, MessageSquare, Heart, LogOut } from "lucide-react";

function SideMenuBar({ onMenuSelect }) {
  const menuItems = [
    { label: "Home", icon: <Home size={22} />, key: "home" },
    { label: "Review", icon: <MessageSquare size={22} />, key: "review" },
    { label: "Favourite", icon: <Heart size={22} />, key: "favourite" },
  ];

  const bottomItems = [
    { label: "Logout", icon: <LogOut size={22} />, key: "logout" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-60 bg-gray-900 text-gray-300 flex flex-col justify-between shadow-lg">
      <div>
        <div className="flex items-center justify-center py-6 text-xl font-bold text-white border-b border-gray-700">
          MovieCut
        </div>
        <nav className="mt-4 p-3 text-xl mb-7">
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}  //props
              {...item} //pass all menu Item property here
              onClick={() => onMenuSelect(item.key)}
            />
          ))}
        </nav>
      </div>

      <div className="mb-4 text-xl border-t border-gray-700 pt-3">
        {bottomItems.map((item) => (
          <MenuItem
            key={item.label}
            {...item}
            onClick={() => onMenuSelect(item.key)}
          />
        ))}
      </div>
    </div>
  );
}

function MenuItem({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-3 w-full hover:bg-[#1f2937] text-left transition-all duration-200"
    >
      {icon}
      <span className="text-md">{label}</span>
    </button>
  );
}

export default SideMenuBar;
