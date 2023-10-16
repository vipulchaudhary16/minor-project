import { useState } from "react";
import PageHeading from "../PageHeading";
import { StudentSection } from "./StudentSection";
import { FacultySection } from "./FacultySection";
import PopUp from "../PopUp";
import AddUsers from "../Forms/AddUsers";
const tabs = [
  {
    label: "Students",
  },
  {
    label: "Faculties",
  },
];
export const Users = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} heading="Add users">
        <AddUsers />
      </PopUp>
      <div className="max-h-screen p-[6rem] overflow-auto">
        <PageHeading title="Users" />
        <div className="">
          <button
            className="bg-[#5d87ff] text-white py-[.5rem] px-[1.5rem] rounded-md text-[1.5rem] font-semibold"
            onClick={() => setIsOpen(true)}
          >
            Add Users
          </button>

          <div className="border-b border-gray-200">
            <nav className="flex gap-[1.5rem]">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`text-[1.5rem] uppercase font-semibold whitespace-nowrap py-[1rem] px-[.4rem] border-b-2 ${
                    activeTab === index
                      ? "border-[#5d87ff] text-[#5d87ff]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-[2rem]">
          {activeTab === 0 && <StudentSection />}
          {activeTab === 1 && <FacultySection />}
        </div>
      </div>
    </>
  );
};
