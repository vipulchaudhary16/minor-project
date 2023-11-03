import React, { FormEvent } from "react";
import PopUp from "../../Utils/PopUp";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/user/user.selector";
import { Project } from "../../../types/index.types";

interface ProjectRowProps {
  project: Project;
}

export const ProjectRowStudent: React.FC<ProjectRowProps> = ({ project }) => {
  const [isPopUpOpen, setIsPopUpOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const user = useSelector(userSelector);

  const openPopUp = () => {
    if (user.group.length === 0) {
      toast.error("Create or join group to send project request");
      return;
    }
    setIsPopUpOpen(true);
  };

  const sendRequest = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      message,
      to: project.faculty?._id,
      problemStatementId: project._id,
      groupId: user.group[0]._id,
    };
    try {
      await axios.post("http://localhost:8080/api/project-request/send", body);
      toast("Request sent successfully");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsPopUpOpen(false);
    }
  };

  return (
    <>
      {isPopUpOpen && (
        <PopUp heading="" isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen}>
          <form className="flex flex-col" onSubmit={(e) => sendRequest(e)}>
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                cols={40}
                rows={8}
                required
              />
            </div>

            <div className="text-center">
              {user.group.length > 0 ? (
                <button
                  type="submit"
                  className="w-full bg-primary-color text-white text-[1.3rem] font-semibold py-[1rem] px-[1.6rem] rounded-lg hover:bg-[#557deb]"
                >
                  Send Request
                </button>
              ) : (
                <p>Create group first</p>
              )}
            </div>
          </form>
        </PopUp>
      )}
      <tr
        key={project._id}
        className={project.selectedBy?.groupNumber ? "bg-[#f3f4f6]" : ""}
      >
        <td className="p-[1.4rem] whitespace-no-wrap">
          <div className="text-[1.3rem] font-medium">{project.statement}</div>
        </td>
        <td className="p-[1.4rem] whitespace-no-wrap">
          <div className="text-[1.3rem] font-medium">{project.domain}</div>
        </td>
        <td className="p-[1.4rem] whitespace-no-wrap">
          <div className="text-[1.3rem] font-medium">
            {project.faculty?.name}
          </div>
        </td>
        <td className="p-[1.4rem] whitespace-no-wrap">
          <div className="text-[1.3rem] font-medium">
            {project.selectedBy?.groupNumber
              ? "Group " + project.selectedBy.groupNumber
              : "Not Selected"}
          </div>
        </td>
        <td className="p-[1.4rem] whitespace-no-wrap">
          <button
            onClick={!project.selectedBy?.groupNumber ? openPopUp : () => {}}
            className={`text-[1.3rem] font-medium  ${
              !project.selectedBy?.groupNumber && "hover:text-primary-color"
            }`}
          >
            {!project.selectedBy?.groupNumber ? "Send Request" : "Selected"}
          </button>
        </td>
      </tr>
    </>
  );
};
