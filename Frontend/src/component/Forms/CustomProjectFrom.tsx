import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import { toast } from "react-toastify";

interface ProjectFormProps {
  // Add any additional props if needed
}

interface FacultyOptions {
  _id: string;
  name: string;
}

export const CustomProjectForm: React.FC<ProjectFormProps> = () => {
  const [projectData, setProjectData] = useState({
    projectTitle: "",
    projectDescription: "",
    projectDomain: "",
    to: "",
  });
  const [toOptions, setToOptions] = useState(Array<FacultyOptions>());

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = async () => {
    try {
      let url = "http://localhost:8080";
      url += `/api/user/?type=1`;
      const res = await axios.get(url);
      console.log(res.data);
      setToOptions(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/problemStatement/custom/create",
        projectData
      );
      toast.success(res.data);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col border-2 p-[1.5rem] gap-[1rem] w-[40rem]"
    >
      <label
        htmlFor={"to"}
        className="block text-[1.2rem] font-semibold mb-[.8rem]"
      >
        Select Faculty <span className="text-red-500">{"*"}</span>
      </label>
      <select
        onChange={(e) => handleChange(e)}
        name="to"
        className="bg-secondary-color text-primary-color border rounded p-2"
      >
        <option value="">Select Option</option>
        {toOptions.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      <InputField
        value={projectData.projectTitle}
        label="Project Title"
        name="projectTitle"
        onChange={handleChange}
      />
      <label
        htmlFor={"to"}
        className="block text-[1.2rem] font-semibold mb-[.8rem]"
      >
        Project Description <span className="text-red-500">{"*"}</span>
      </label>
      <textarea
        value={projectData.projectDescription}
        className="w-full px-[1.2rem] py-[.8rem] border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]"
        placeholder="Project Description"
        name="projectDescription"
        onChange={handleChange}
      />

      <InputField
        value={projectData.projectDomain}
        label="Project Domain"
        name="projectDomain"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-primary-color text-white px-[1.5rem] py-[0.5rem] rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};
