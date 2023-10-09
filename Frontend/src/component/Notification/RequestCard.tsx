import React from "react";

interface RequestCardProps {
	requestType: string;
	time: string;
	requestedTo: string;
	requestedBy: string;
	message?: string;
	status: "accepted" | "rejected" | "pending";
	problemStatement?: string; // This is optional and only present if requestType is 'project'
}

const RequestCard: React.FC<RequestCardProps> = ({
  requestType,
  time,
  requestedTo,
  requestedBy,
  message,
  status,
  problemStatement,
}) => {
  return (
    <>
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
            <div className="text-[1.6rem] font-semibold">
              {requestType}
            </div>
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
          {message ? <div className="text-[1.4rem]">
            <span className="text-[1.4rem] font-semibold">Message:</span>{" "}
            {message}
          </div> : <></>}
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
              <button className="bg-green-500 hover:bg-green-600 text-white text-[1.1rem] font-semibold py-[.9rem] px-[2rem] rounded-full me-[1rem]">
                Accept
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white text-[1.1rem] font-semibold py-[.9rem] px-[2rem] rounded-full">
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
