import React from "react";
import "./index";

interface SidebarProps {
  selectedText: string;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedText, onClose }) => {
  return (
    <div className="sidebar">
      <div className="header">
        <h3>Deep Read AI</h3>
        <button onClick={onClose} className="closeBtn">
          &times;
        </button>
      </div>
      <div className="content">
        <p className="selectedText">
          <strong>You selected:</strong> {selectedText}
        </p>
        <div className="aiResponse">
          <p>
            <em>AI explanation will appear here...</em>
          </p>
        </div>
      </div>
    </div>
  );
};
