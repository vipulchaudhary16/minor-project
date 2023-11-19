import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import PopUp from "../Utils/PopUp";
import { notificationType } from "../../types/notification.types";

interface RequestCardProps {
  id: string;
  requestType: "GROUP_INVITE" | "PROJECT_REQUEST" | "CUSTOM_PROJECT_REQUEST";
  time: string;
  status: "accepted" | "rejected" | "pending";
  request: notificationType;
  category: "sent" | "received";
}

const RequestCard: React.FC<RequestCardProps> = ({
  requestType,
  id,
  time,
  status,
  category,
  request,
}) => {
  const [updateMessage, setUpdateMessage] = React.useState<string>("");
  const [updateStatus, setUpdateStatus] = React.useState<string>("");
  const [isPopUpOpen, setIsPopUpOpen] = React.useState<boolean>(false);
  const [userDetails, setUserDetails] = React.useState<any>({
    sender: "",
    receiver: "",
  });

  useEffect(() => {
    if (category == "sent") {
      setUserDetails({
        sender: "You",
        receiver: request.user?.name,
      });
    } else if (category == "received") {
      setUserDetails({
        sender: request.user?.name,
        receiver: "You",
      });
    }
  }, [request]);

  const handleAcceptRequest = async (type: string) => {
    switch (type) {
      case "GROUP_INVITE": {
        try {
          await axios.put(
            "http://localhost:8080/api/group/invite/?invitationId=" +
              id +
              "&status=accepted"
          );
          toast.success("Group invitation accepted");
          // onSuccess();
        } catch (error) {
          toast.error("Something went wrong");
        }
        break;
      }
      case "PROJECT_REQUEST": {
        setUpdateStatus("accepted");
        setIsPopUpOpen(true);
        break;
      }
      case "CUSTOM_PROJECT_REQUEST": {
        setUpdateStatus("accepted");
        setIsPopUpOpen(true);
        break;
      }
    }
  };

  const handleRejectRequest = async (type: string) => {
    switch (type) {
      case "GROUP_INVITE": {
        try {
          await axios.put(
            "http://localhost:8080/api/group/invite/?invitationId=" +
              id +
              "&status=rejected"
          );
          toast.success("Group invitation rejected");
          // onSuccess();
        } catch (error) {
          toast.error("Something went wrong");
        }
        break;
      }
      case "PROJECT_REQUEST": {
        setUpdateStatus("rejected");
        setIsPopUpOpen(true);
        break;
      }
      case "CUSTOM_PROJECT_REQUEST": {
        setUpdateStatus("rejected");
        setIsPopUpOpen(true);
        break;
      }
    }
  };

  const sendUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      message: updateMessage,
      status: updateStatus,
      requestId: "",
    };
    try {
      if (requestType === "PROJECT_REQUEST") {
        await axios.put(
          `http://localhost:8080/api/project-request/update/${id}`,
          body
        );
      } else if (requestType === "CUSTOM_PROJECT_REQUEST") {
        body.requestId = id;
        await axios.put(
          `http://localhost:8080/api/problemStatement/custom/update`,
          body
        );
      }

      // onSuccess();
      return toast.success("Update sent successfully");
    } catch (error) {
      return toast.error("Something went wrong");
    } finally {
      setIsPopUpOpen(false);
    }
  };

  return (
    <>
      <PopUp isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen} heading="">
        <form className="flex flex-col" onSubmit={(e) => sendUpdate(e)}>
          <div className="mb-[2rem]">
            <label
              htmlFor="message"
              className="block text-[1.3rem] font-semibold mb-[1rem]"
            >
              Message
            </label>
            <textarea
              placeholder="Enter your message to be sent to the faculty"
              className="w-full px-[1.2rem] py-[.8rem] border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]"
              value={updateMessage}
              onChange={(e) => setUpdateMessage(e.target.value)}
              cols={40}
              rows={8}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-primary-color text-white text-[1.3rem] font-semibold py-[1rem] px-[1.6rem] rounded-lg hover:bg-[#557deb]"
            >
              Send
            </button>
          </div>
        </form>
      </PopUp>
      <div
        className={`card ${
          status !== "pending"
            ? status === "accepted"
              ? "bg-green-100"
              : "bg-red-100"
            : ""
        } p-[2.5rem] rounded-3xl text-[#5A6A85]`}
      >
        <div className="flex flex-col gap-[.5rem]">
          <div className="flex justify-between items-center mb-[1rem]">
            <div className="text-[1.6rem] font-semibold">{requestType}</div>
            <div className="text-[1.6rem] font-semibold">{time}</div>
          </div>
          {requestType === "GROUP_INVITE" && (
            <p>
              {`${userDetails.sender} sent ${userDetails.receiver} a group invite for joining the group number ${request.groupDetails?.groupNo}`}
            </p>
          )}
          {requestType === "PROJECT_REQUEST" && (
            <p>
              {`${userDetails.sender} sent ${userDetails.receiver} a project request for the project titled ${request.problemStatementDetails?.title} in the domain ${request.problemStatementDetails?.domain} with the problem statement ${request.problemStatementDetails?.statement}`}
            </p>
          )}
          {requestType === "CUSTOM_PROJECT_REQUEST" && (
            <p>
              {`${userDetails.sender} sent ${userDetails.receiver} a custom project request for the project titled ${request.problemStatementDetails?.title} in the domain ${request.problemStatementDetails?.domain} with the problem statement ${request.problemStatementDetails?.statement}`}
            </p>
          )}
        </div>
        <>
          {status === "pending" ? (
            <div className="mt-[1.3rem]">
              <button
                onClick={() => handleAcceptRequest(requestType)}
                className="bg-green-500 hover:bg-green-600 text-white text-[1.1rem] font-semibold py-[.9rem] px-[2rem] rounded-full me-[1rem]"
              >
                Accept
              </button>
              <button
                onClick={() => handleRejectRequest(requestType)}
                className="bg-red-500 hover:bg-red-600 text-white text-[1.1rem] font-semibold py-[.9rem] px-[2rem] rounded-full"
              >
                Reject
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
    </>
  );
};

export default RequestCard;
