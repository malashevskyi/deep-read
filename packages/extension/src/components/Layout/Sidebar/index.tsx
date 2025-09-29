import React from "react";
import { useAppStore } from "../../../store";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { selectedText, explanation, isLoading, error, closeSidebar } =
    useAppStore();

  return (
    <div className="fixed top-0 right-0 h-full w-[350px] ...">
      <div className="flex justify-between items-center p-4 ...">
        <h3 className="m-0 text-base font-semibold">DeepRead AI</h3>
        <button onClick={closeSidebar} className="...">
          &times;
        </button>
      </div>
      <div className="p-4 overflow-y-auto flex-grow">
        <p className="mt-0 p-3 italic ...">
          <strong>You selected:</strong> {selectedText}
        </p>
        <div className="mt-5">
          {isLoading && (
            <p>
              <em>Loading explanation...</em>
            </p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && explanation && <p>{explanation}</p>}
        </div>
      </div>
    </div>
  );
};
