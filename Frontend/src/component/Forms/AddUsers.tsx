import axios from "axios";
import React, { useState } from "react";
import { Loader } from "../Utils/Loader";
import { toast } from "react-toastify";

const AddUsers: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(2);
  const [file, setFile] = useState<File>();

  const csvFileToArray = async (text: any) => {
    const data = text.split("\n");
    const headers = data[0].split(",");
    const users = [];
    for (let i = 1; i < data.length; i++) {
      const user = {
        name: "",
        rollNo: "",
        email: "",
        role,
      };
      const currentline = data[i].split(",");
      console.log(data[i]);
      if (currentline.length !== 3) continue;
      for (let j = 0; j < headers.length; j++) {
        user["name"] = currentline[0];
        user["email"] = currentline[1];
        user["rollNo"] = currentline[2].replace("\r", "");
      }
      users.push(user);
    }

    try {
      await axios
        .post("http://localhost:8080/api/user/register", { users: users })
        .then((res) => {
          console.log(res);
          setLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fileReader = new FileReader();
    fileReader.onload = function (event: any) {
      const text = event.target.result;
      csvFileToArray(text);
    };
    if (file) fileReader.readAsText(file);
  };

  return (
    <>
      <div className="p-[2.5rem] bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="p-[6rem]">
            <Loader heading="Adding users" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-primary-color">
            <div className="mb-[1.6rem]">
              <label
                htmlFor="role"
                className="block text-[1.2rem] font-semibold mb-[.8rem]"
              >
                Select Role
              </label>
              <select
                id="role"
                className="w-full px-[1.2rem] py-[.8rem] border rounded-md focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]"
                onChange={(e) => {
                  setRole(parseInt(e.target.value));
                }}
                required
              >
                <option value="2">Student</option>
                <option value="1">Faculty</option>
              </select>
            </div>
            <div className="mb-[1.6rem]">
              <label
                htmlFor="file"
                className="block text-[1.2rem] font-semibold mb-[.8rem]"
              >
                Excel File
              </label>
              <input
                type="file"
                id="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="w-full px-[1.2rem] py-[.8rem] border rounded-md focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]"
                onChange={(e) => {
                  setFile(e.target.files![0]);
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-color text-white text-[1.3rem] font-semibold py-[1rem] px-[1.6rem] rounded-md hover:bg-[#557deb]"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AddUsers;
