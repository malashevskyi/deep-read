import { useHoverScrollLock } from "../../../hooks/useHoverScrollLock";
import { useAppStore } from "../../../store";
import ContextDetails from "../../ui/ContextDetails";
import Analysis from "../Analysis";

export const Sidebar = () => {
  const closeSidebar = useAppStore((state) => state.closeSidebar);
  const scrollLockRef = useHoverScrollLock<HTMLDivElement>();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 w-full bg-white border-t-3 border-solid border-gray-400 shadow-[-2px_0_8px_rgba(0,0,0,0.1)] z-[99999999] flex flex-col font-sans text-gray-800"
      style={{
        height: "clamp(400px, 33vh, 100vh)",
      }}
      ref={scrollLockRef}
    >
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close"
      >
        &times;
      </button>
      <div className="p-4 overflow-y-auto flex-grow">
        <ContextDetails />
        <div className="mt-5">
          <Analysis />
        </div>
      </div>
    </div>
  );
};
