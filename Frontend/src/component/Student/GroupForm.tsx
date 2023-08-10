import React, { useState } from "react";
import { toast } from "react-toastify";

const rollNumbers = [
  "202301",
  "202302",
  "202303",
  "202304",
  "202305",
  "202306",
  "202307",
  "202308",
  "202309",
  "202310",
  "202311",
  "202312",
  "202313",
  "202314",
  "202315",
  "202316",
  "202317",
  "202318",
  "202319",
  "202320",
];

const GroupForm = () => {
  const [selectedRollNumber, setSelectedRollNumber] = useState<
    string | undefined
  >(undefined);
  const [members, setMembers] = useState<string[]>(["202345"]);

  const handleAddMember = () => {
    if (!selectedRollNumber) {
      toast.error("First select roll no.");
    } else if (members.length < 3) {
      setMembers((prev) => [...prev, selectedRollNumber]);
      setSelectedRollNumber(undefined);
    } else {
      toast.error("Max 3 members are allowed");
      setSelectedRollNumber(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (members.length > 1) {
      //   onSubmit(groupName, members);
      console.log(members);
    }
  };

  return (
    <div className="max-w-[50rem] w-screen p-[1.6rem]">
      <div>
        <div className="block text-[1.8rem] font-semibold">Members</div>
        <ul className="mt-[1rem] flex flex-col gap-[1rem]">
          {members.map((member, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-[3rem] bg-gray-100 p-[1rem] rounded-md"
            >
              <div className="flex gap-[.5rem]">
                <p className="text-[1.25rem] font-semibold">
                  Member {index + 1}:{" "}
                </p>
                <p className="text-[1.25rem]">{member}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setMembers((prev) => prev.filter((_, i) => i !== index))
                }
                className="text-[1.2rem] text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-[1.8rem] font-semibold mt-[3rem]">
          Add Member
        </div>
        <form onSubmit={handleSubmit} className="mt-[.8rem]">
          <div className="flex justify-between items-center">
            <select
              id="rollNumber"
              value={selectedRollNumber || ""}
              onChange={(e) => setSelectedRollNumber(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition ease-in-out duration-150"
            >
              <option value="">Select Roll No</option>
              {rollNumbers.map((rollNumber, index) => (
                <option key={index} value={rollNumber}>
                  {rollNumber}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddMember}
              className="border border-[#5d87ff] text-[#5d87ff] text-[1.2rem] font-semibold py-[.5rem] px-[1.5rem] rounded-md hover:bg-[#557deb] hover:text-[#fff]"
            >
              Add
            </button>
          </div>
          <div className="mt-[1.5rem]">
            <button
              type="submit"
              className="w-full bg-[#5d87ff] text-white text-[1.3rem] font-semibold py-[.8rem] rounded-md hover:bg-[#557deb]"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
