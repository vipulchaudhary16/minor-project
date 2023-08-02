import ProjectTable from "./ProjectTable";

const ProjectLists = () => {

  return (
    <>
      <div className="max-h-screen p-[6rem] overflow-auto">
        <div className="bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg">
          <h2 className="text-[2.2rem] text-[#5d87ff] font-semibold">Project List</h2>
        </div>
        <div className="card p-[2.5rem] rounded-lg">
          <ProjectTable />
        </div>
      </div>
    </>
  )
}

export default ProjectLists;