import { useHoverScrollLock } from "../../../hooks/useHoverScrollLock";
import { useAppStore } from "../../../store";
import ContextDetails from "../../ui/ContextDetails";
import Analysis from "../Analysis";
import History from "../../ui/History";

export const Sidebar = () => {
  const closeSidebar = useAppStore((state) => state.closeSidebar);
  const { scrollLockRef, pageXOffset } = useHoverScrollLock<HTMLDivElement>();
  const viewMode = useAppStore((state) => state.sidebar.viewMode);

  const isNewMode = viewMode === "new";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 w-full bg-white border-t-3 border-solid border-gray-400 shadow-[-2px_0_8px_rgba(0,0,0,0.1)] z-[99999999] flex flex-col font-sans text-gray-800"
      style={{
        height: "clamp(300px, 25vh, 100vh)",
      }}
      ref={scrollLockRef}
    >
      <button
        onClick={closeSidebar}
        style={{ right: `${30 - pageXOffset}px` }}
        className="absolute top-4 z-10 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close"
      >
        &times;
      </button>

      <div className="p-4 px-20 overflow-y-auto flex-grow">
        {isNewMode && (
          <>
            <ContextDetails />
            <div className="mt-5">
              <Analysis />
            </div>
            <hr />
          </>
        )}
        <History />
      </div>
    </div>
  );
};
