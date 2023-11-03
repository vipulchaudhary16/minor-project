import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import PopUp from "../Utils/PopUp";

interface RequestCardProps {
  id: string;
  requestType: string;
  time: string;
  requestedTo: string;
  requestedBy: string;
  message?: string;
  status: "accepted" | "rejected" | "pending";
  problemStatement?: string;
}

const RequestCard: React.FC<RequestCardProps> = ({
  requestType,
  id,
  time,
  requestedTo,
  requestedBy,
  message,
  status,
  problemStatement,
}) => {
  const [updateMessage, setUpdateMessage] = React.useState<string>("");
  const [updateStatus, setUpdateStatus] = React.useState<string>("");
  const [isPopUpOpen, setIsPopUpOpen] = React.useState<boolean>(false);

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
      }
    }
  };

  const sendUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      message: updateMessage,
      status: updateStatus,
    };
    try {
      await axios.put(
        `http://localhost:8080/api/project-request/update/${id}`,
        body
      );
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
          <div className="text-[1.4rem]">
            <span className="text-[1.4rem] font-semibold">Requested To:</span>{" "}
            {requestedTo}
          </div>
          <div className="text-[1.4rem]">
            <span className="text-[1.4rem] font-semibold">Requested By:</span>{" "}
            {requestedBy}
          </div>
          {message ? (
            <div className="text-[1.4rem]">
              <span className="text-[1.4rem] font-semibold">Message:</span>{" "}
              {message}
            </div>
          ) : (
            <></>
          )}
          {status === "pending" ? (
            <div className="text-[1.4rem]">
              <span className="text-[1.4rem] font-semibold">Status:</span>{" "}
              {status}
            </div>
          ) : (
            <></>
          )}
          {requestType === "PROJECT_REQUEST" && problemStatement && (
            <div className="text-[1.4rem] font-semibold">
              Problem Statement:{" "}
              <span className="text-[1.4rem] font-normal">
                {/* Display the problem statement, adding an ellipsis if it's longer than 60 characters */}
                {problemStatement.length > 60
                  ? `${problemStatement.slice(0, 60)}...`
                  : problemStatement}
              </span>
            </div>
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
