import React from "react";

interface Project {
  id: number;
  title: string;
  faculty: string;
}

interface Props {
  projects?: Project[];
}

const projectsData: Array<Project> = [
  ...Array(50).fill(null).map((_, index) => ({
    id: index + 1,
    title: `Project ${String.fromCharCode(65 + index)}`,
    faculty: `Faculty ${index + 1}`,
  })),
];


const ProjectTable: React.FC<Props> = ({ projects = projectsData }) => {
  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.5rem] text-[#5A6A85] font-semibold uppercase tracking-wider">
              Project Title
            </th>
            <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.5rem] text-[#5A6A85] font-semibold uppercase tracking-wider">
              Faculty Name
            </th>
            <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.5rem] text-[#5A6A85] font-semibold uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="text-[#5A6A85]">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-[2.4rem] py-[1.6rem] whitespace-no-wrap">
                <div className="text-[1.3rem] font-medium">
                  {project.title}
                </div>
              </td>
              <td className="px-[2.4rem] py-[1.6rem] whitespace-no-wrap">
                <div className="text-[1.3rem] font-medium">{project.faculty}</div>
              </td>
              <td className="px-[2.4rem] py-[1.6rem] whitespace-no-wrap">
                <button className="text-[1.3rem] font-medium hover:text-[#5d87ff]">
                  View
                </button>
                <button className="ml-4 text-[1.3rem] font-medium hover:text-[#5d87ff]">
                  Share
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;