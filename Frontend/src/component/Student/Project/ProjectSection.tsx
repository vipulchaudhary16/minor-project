import { useEffect, useState } from "react";
import ProjectTable from "../../ProjectTable";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../Utils/Loader";
import PageHeading from "../../Utils/PageHeading";
import SearchBar from "../../Utils/SearchBar";
import FilterDropDown from "../../Utils/FilterDropDown";
import PopUp from "../../Utils/PopUp";
import { CustomProjectForm } from "../../Forms/CustomProjectFrom";

export const ProjectSectionStudent = () => {
  const [projectList, setProjectList] = useState([]);
  const columns = [
    "Problem Statements",
    "Domain",
    "Faculty Name",
    "Selected By",
    "Action",
  ];
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchFacultyList();
    handleSearch();
  }, []);

  const fetchFacultyList = async () => {
    try {
      let url = "http://localhost:8080";
      url += `/api/user/?type=1`;
      const res = await axios.get(url);
      setFacultyList(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:8080";
      url += `/api/problemStatement/?q=${searchQuery}`;
      if (facultyFilter) {
        url += `&facultyId=${facultyFilter}`;
      }
      const res = await axios.get(url);
      setProjectList(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFacultyFilter = async (value: string) => {
    // const value = e.target.value;
    // alert(value);
    setFacultyFilter(value);
  };

  return (
    <>
      <PopUp
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        heading="Request Your Project"
      >
        <CustomProjectForm />
      </PopUp>
      <div className="max-h-screen p-[3rem] overflow-auto">
        <PageHeading title="Project Lists" />
        <div className="flex flex-row-reverse items-center gap-4 pb-4">
          <FilterDropDown items={facultyList} onChange={handleFacultyFilter} />
          <SearchBar
            query={searchQuery}
            querySetter={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search by problem statement and domain"
          ></SearchBar>
          <button
            className="bg-primary-color text-white px-[1.5rem] py-[0.5rem] rounded-lg"
            onClick={() => setIsFormOpen(true)}
          >
            Request Your Project
          </button>
        </div>

        <div className="card p-[2.5rem] rounded-3xl">
          {loading ? (
            <Loader heading="Loading projects" />
          ) : projectList.length <= 0 ? (
            <div className="text-[1.4rem] text-[#5A6A85] font-semibold text-center">
              No matching problem statement found...
            </div>
          ) : (
            <ProjectTable projects={projectList} columns={columns} />
          )}
        </div>
      </div>
    </>
  );
};
