import { useEffect, useState } from "react";
import { SentRequests } from "./SentRequests";
import { ReceivedRequests } from "./ReceivedRequests";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/user.selector";
import PageHeading from "../Utils/PageHeading";

export const NotificationsContainer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user.role === 1) {
      setActiveTab(1);
    } else if (user.role === 2) {
      setActiveTab(0);
    }
  }, [user]);

  const tabs = [
    {
      label: "sent",
      role: 2,
    },
    {
      label: "received",
      role: 1,
    },
  ];

  return (
    <div className="max-h-screen p-[3rem] overflow-auto">
      <PageHeading title="Notifications" />
      <div className="">
        <div className="border-b border-gray-200">
          <nav className="flex gap-[1.5rem]">
            {tabs.map((tab, index) => (
              <>
                {user.role >= tab.role && (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`text-[1.5rem] uppercase font-semibold whitespace-nowrap py-[1rem] px-[.4rem] border-b-2 ${
                      activeTab === index
                        ? "border-primary-color text-primary-color"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                )}
              </>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex flex-col gap-[2rem]">
        {activeTab === 1 && <ReceivedRequests activeTab={activeTab} />}
        {activeTab === 0 && <SentRequests activeTab={activeTab} />}
      </div>
    </div>
  );
};
