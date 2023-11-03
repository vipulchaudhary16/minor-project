import React from "react";
import { Project } from "../../../types/index.types";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface ProjectRowProps {
  project: Project;
}

export const ProjectRowFaculty: React.FC<ProjectRowProps> = ({ project }) => {
  return (
    <>
      <tr key={project._id}>
        <td className="p-[1.4rem] whitespace-no-wrap">
          <div className="text-[1.3rem] font-medium">{project.statement}</div>
        </td>
        <td className="p-[1.4rem] whitespace-no-wrap">
          <div className="text-[1.3rem] font-medium">{project.domain}</div>
        </td>
        <td className="p-[1.4rem] whitespace-no-wrap">
          <div className="text-[1.3rem] font-medium">
            {project.selectedBy?.groupNumber
              ? "Group " + project.selectedBy.groupNumber
              : "Not Selected"}
          </div>
        </td>
        <td className="p-[1.4rem] text-[1.3rem] whitespace-no-wrap">
          <span className="px-2">
            <AiOutlineEdit className="inline text-cyan-600 text-[1.3rem] cursor-pointer" />
          </span>
          <span className="px-2">
            <AiOutlineDelete className="inline text-red-600 text-[1.3rem] cursor-pointer" />
          </span>
        </td>
      </tr>
    </>
  );
};
