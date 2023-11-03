import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../store/user/user.selector";
import { ProjectRowStudent } from "./Student/Project/ProjectRow";
import { ProjectRowFaculty } from "./Faculty/Projects/ProjectRow";
import { Project } from "../types/index.types";

interface Props {
  projects: Project[];
  columns: string[];
}

const ProjectTable: React.FC<Props> = ({ projects, columns }) => {
  const user = useSelector(userSelector);
  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="p-[1.4rem] text-left text-[1.4rem] text-[#5A6A85] font-semibold uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#5A6A85]">
          {projects.map((project) => (
            <>
              {user.role === 1 && ProjectRowFaculty({ project })}
              {user.role === 2 && ProjectRowStudent({ project })}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
