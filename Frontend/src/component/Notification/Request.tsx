import React, { useMemo } from "react";
import { TRequest } from "../../types/request.types";
import { RequestDetails } from "./RequestDetails";
import axios from "axios";
import { toast } from "react-toastify";
import PopUp from "../Utils/PopUp";
import { convertTimeIntoIST } from "../../utils/functions";
import RequestCard from "./RequestCard";

interface RequestProps {
  request: TRequest;
  requestType: string;
  onSuccess: Function;
}

export const Request: React.FC<RequestProps> = ({
  request,
  requestType,
  onSuccess,
}) => {
  const [message, setMessage] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [isPopUpOpen, setIsPopUpOpen] = React.useState<boolean>(false);

  const handleAcceptRequest = async (type: string) => {
    switch (type) {
      case "GROUP_INVITE": {
        try {
          await axios.put(
            "http://localhost:8080/api/group/invite/?invitationId=" +
              request.id +
              "&status=accepted"
          );
          toast.success("Group invitation accepted");
          onSuccess();
        } catch (error) {
          toast.error("Something went wrong");
        }
        break;
      }
      case "PROJECT_REQUEST": {
        setStatus("accepted");
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
              request.id +
              "&status=rejected"
          );
          toast.success("Group invitation rejected");
          onSuccess();
        } catch (error) {
          toast.error("Something went wrong");
        }
        break;
      }
      case "PROJECT_REQUEST": {
        setStatus("rejected");
        setIsPopUpOpen(true);
      }
    }
  };

  const sendUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      message,
      status,
    };
    try {
      await axios.put(
        `http://localhost:8080/api/project-request/update/${request.id}`,
        body
      );
      onSuccess();
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
              className="w-full px-[1.2rem] py-[.8rem] border rounded-md focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              cols={40}
              rows={8}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-primary-color text-white text-[1.3rem] font-semibold py-[1rem] px-[1.6rem] rounded-md hover:bg-[#557deb]"
            >
              Send
            </button>
          </div>
        </form>
      </PopUp>
      
      <RequestCard
        requestType={request.type}
        time={convertTimeIntoIST(request.createdAt)}
        requestedTo={requestType === "sent" ? request.user.name : "You"}
        requestedBy={requestType === "sent" ? "You" : request.user.name}
        message={request.message_by_sender}
        status={request.status}
        problemStatement={request?.problemStatementDetails?.statement}
      />

      {/* <div className="border rounded-lg p-4 bg-gray-100 my-4">
        <RequestDetails
          fromName={requestType === "sent" ? "You" : request.user.name}
          toName={requestType === "sent" ? request.user.name : "You"}
          formattedDate={convertTimeIntoIST(request.createdAt)}
          statement={
            request.type === "GROUP_INVITE"
              ? requestType === "sent"
                ? "joining your group"
                : " joining his group"
              : `selecting problem statement ${request?.problemStatementDetails?.statement}`
          }
          status={request.status}
          message={request.message_by_sender}
        />
        {requestType === "received" && (
          <div>
            {request.status === "pending" && (
              <div className="flex flex-row-reverse">
                <button
                  onClick={() => handleAcceptRequest(request.type)}
                  className="px-8 py-4 bg-green-400 mx-2 text-2xl rounded-full text-white font-bold"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(request.type)}
                  className="px-8 py-4 bg-red-400 mx-2 text-2xl rounded-full text-white font-bold"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </div> */}
    </>
  );
};
