import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateProfileForm: React.FC = () => {
  const [choice, setChoice] = useState<string>("");
  const navigate = useNavigate();

  const handleChoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChoice(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (choice === "") {
      return toast.error("Please select an option");
    }
    try {
      const newData = {
        choice,
      };
      await axios
        .put("http://localhost:8080/api/user", { newData })
        .then((res) => {
          console.log(res.data);
          if (!res.data.choice) {
            toast.error("You must have to select an one choice");
            return;
          }
          navigate("/student");
        });
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-gray-600 mb-4">Update Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center justify-center space-y-4"
      >
        <div className="p-2">
          <label htmlFor="choice" className="block font-bold text-gray-600">
            What type of comprensive exam do you want to take?
          </label>
          <select
            id="choice"
            name="choice"
            value={choice}
            onChange={handleChoiceChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select an option</option>
            <option value="IND">Industrial training</option>
            <option value="INH">In-House project</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
