import React from "react";
import { useAppStore } from "../../../store";
import { ErrorDisplay } from "../../ui/ErrorDisplay";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { isLoading, data, error } = useAppStore((state) => state.analysis);
  const selectedText = useAppStore((state) => state.sidebar.selectedText);
  const closeSidebar = useAppStore((state) => state.closeSidebar);

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
          <ErrorDisplay error={error} />
          {!isLoading && (
            <>
              {data && (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg">
                      [{data.word.transcription}]
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">Example</h4>
                    <p className="mt-1 text-gray-700">
                      {data.example.adaptedSentence}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      <em>{data.example.translation}</em>
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
