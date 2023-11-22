import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../../../store/user/user.selector";
import PopUp from "../../Utils/PopUp";
import AddProblemStatementForm from "../../Forms/AddProblemStatement";
import ProjectTable from "../../ProjectTable";
import { Loader } from "../../Utils/Loader";

export const ProjectSectionFaculty = () => {
  const [projectList, setProjectList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const user = useSelector(userSelector);
  const columns = [
    "Title",
    "Problem Statements",
    "Domain",
    "Selected Group",
    "Action",
  ];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjectList();
  }, []);

  const fetchProjectList = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:8080";
      url += "/api/problemStatement/?facultyId=" + user.id;
      const res = await axios.get(url);
      setProjectList(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOnSuccess = () => {
    setIsFormOpen(false);
    fetchProjectList();
  };

  return (
    <>
      <PopUp
        setIsOpen={setIsFormOpen}
        isOpen={isFormOpen}
        heading="Add Project"
      >
        <AddProblemStatementForm onSuccess={handleOnSuccess} />
      </PopUp>
      <div className="max-h-screen p-[3rem] overflow-auto">
        <div className="bg-secondary-color mb-[3rem] p-[1.5rem] rounded-lg">
          <h2 className="text-[2.2rem] text-primary-color font-semibold">
            Project List
          </h2>
        </div>
        <div className="flex justify-between items-center mb-[2rem]">
          <button
            className="bg-primary-color text-white px-[1.5rem] py-[0.5rem] rounded-lg"
            onClick={() => setIsFormOpen(true)}
          >
            Add Project
          </button>
        </div>
        <div className="card p-[2.5rem] rounded-lg">
          {loading ? (
            <Loader heading="Loading projects" />
          ) : (
            <ProjectTable projects={projectList} columns={columns} />
          )}
        </div>
      </div>
    </>
  );
};
