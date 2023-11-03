import { useEffect, useState } from "react";
// import { SentRequests } from "./SentRequests";
// import { ReceivedRequests } from "./ReceivedRequests";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/user.selector";
import PageHeading from "../Utils/PageHeading";
import axios from "axios";
import { toast } from "react-toastify";
import RequestCard from "./RequestCard";
import { notificationType } from "../../types/notification.types";
import { Loader } from "../Utils/Loader";

export const NotificationsContainer = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sentRequests, setSentRequests] = useState<Array<notificationType>>();
  const [receivedRequests, setReceivedRequests] =
    useState<Array<notificationType>>();
  const user = useSelector(userSelector);

  useEffect(() => {
    getSentRequests();
    getReceivedRequests();
  }, []);

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

  const getReceivedRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/project-request?type=received"
      );
      setReceivedRequests(res.data);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
    }
    setLoading(false);
  };

  const getSentRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/project-request?type=sent"
      );
      setSentRequests(res.data);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen p-[3rem] overflow-auto">
      <PageHeading title="Notifications" />
      <div className="border-b border-gray-200 mb-[2rem]">
        <nav className="flex gap-[1.5rem]">
          {tabs.map((tab, index) => (
            <>
              {user.role >= tab.role && (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`text-[1.3rem] uppercase font-semibold whitespace-nowrap py-[1rem] px-[.4rem] border-b-2 ${
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
      <div className="flex flex-col gap-[2rem]">
        {loading ? (
          <Loader heading={""} />
        ) : activeTab === 0 ? (
          <>
            {sentRequests?.length !== 0 ? (
              sentRequests?.map((request, index) => (
                <RequestCard
                  id={request.id}
                  key={index}
                  requestType={request.type}
                  time={request.createdAt}
                  requestedBy={"You"}
                  requestedTo={request.user.name}
                  message={request.message_by_sender}
                  status={request.status}
                  problemStatement={request.problemStatementDetails?.statement}
                ></RequestCard>
              ))
            ) : (
              <div className="text-[1.4rem] text-[#5A6A85] font-semibold text-center">
                No notification to show...
              </div>
            )}
          </>
        ) : (
          <>
            {receivedRequests?.length !== 0 ? (
              receivedRequests?.map((request, index) => (
                <RequestCard
                  id={request.id}
                  key={index}
                  requestType={request.type}
                  time={request.createdAt}
                  requestedBy={request.user.name}
                  requestedTo={"You"}
                  message={request.message_by_sender}
                  status={request.status}
                  problemStatement={request.problemStatementDetails?.statement}
                ></RequestCard>
              ))
            ) : (
              <div className="text-[1.4rem] text-[#5A6A85] font-semibold text-center">
                No notification to show...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
