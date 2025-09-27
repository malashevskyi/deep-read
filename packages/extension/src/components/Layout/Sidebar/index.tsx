import React from "react";

interface SidebarProps {
  selectedText: string;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedText, onClose }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-[350px] bg-white border-l border-gray-200 shadow-lg z-[2147483647] flex flex-col font-sans text-gray-800">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="m-0 text-base font-semibold">DeepRead AI</h3>
        <button
          onClick={onClose}
          className="p-1 leading-none text-2xl text-gray-400 hover:text-gray-900 bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>
      </div>
      <div className="p-4 overflow-y-auto flex-grow">
        <p className="mt-0 p-3 italic text-gray-600 border-l-4 border-blue-500 break-words">
          <strong>You selected:</strong> {selectedText}
        </p>
        <div className="mt-5">
          <p>
            <em>AI explanation will appear here...</em>
          </p>
        </div>
      </div>
    </div>
  );
};
