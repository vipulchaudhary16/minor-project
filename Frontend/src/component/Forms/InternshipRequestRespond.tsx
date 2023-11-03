import React from "react";
import InputField from "./InputField";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

export const InternshipRequestRespond: React.FC<Props> = ({ id }) => {
  const [update, setUpdate] = React.useState({
    status: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/industry/update/${id}`,
        update
      );
      toast.success(res.data);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col border-2 p-[1.5rem] gap-[1rem]"
    >
      <select
        onChange={(e) =>
          setUpdate({
            ...update,
            status: e.target.value,
          })
        }
        className="bg-secondary-color text-primary-color border rounded p-2"
      >
        <option value="">Select Status</option>
        <option value="accepted">Accept</option>
        <option value="rejected">Reject</option>
      </select>

      <InputField
        value={update.message}
        label="Message"
        name="message"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-primary-color text-white px-[1.5rem] py-[0.5rem] rounded-lg"
      >
        Respond
      </button>
    </form>
  );
};
