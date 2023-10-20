import React, { useState } from "react";
import SideNav from "../component/SideNav";

interface DefaultLayoutProps {
  role: number;
  children: React.ReactNode;
}

const SidebarToggleButton: React.FC<{
  showSidebar: boolean;
  toggleSidebar: () => void;
}> = ({ showSidebar, toggleSidebar }) => (
  <div className="pt-[1rem]">
    <button
      className="card w-[4rem] h-[4rem] p-[1rem] rounded-full bg-secondary-color text-primary-color hover:bg-primary-color hover:text-white"
      onClick={toggleSidebar}
      aria-label={showSidebar ? "Close Sidebar" : "Open Sidebar"}
    >
      <i className="fas fa-bars fa-lg" aria-hidden="true"></i>
    </button>
  </div>
);

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ role, children }) => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768); // Initially hide sidebar for smaller devices

  return (
    <>
      <div className="max-h-screen h-screen grid grid-cols-12">
        <div
          className={`${
            showSidebar ? "col-span-3" : "col-span-1"
          } p-[3rem] flex gap-[1rem]`}
        >
          <div
            className={`${
              showSidebar
                ? "block flex-grow transition-transform duration-300"
                : "hidden"
            }`}
          >
            <SideNav role={role} />
          </div>
          <SidebarToggleButton
            showSidebar={showSidebar}
            toggleSidebar={() => setShowSidebar(!showSidebar)}
          />
        </div>
        <div className={`${
            showSidebar ? "col-span-9" : "col-span-11"
          }`}>{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
