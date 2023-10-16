import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table } from "./Table";
import { TD } from "../Table/TD";

export type Faculty = {
  _id: string;
  name: string;
  email: string;
  problemStatements: ProblemStatement[];
};

type ProblemStatement = {
  _id: string;
  statement: string;
  selectedBy?: {
    _id: string;
    groupNumber: number;
  };
};

const columns = ["Name", "Email", "Problem Statements"];

export const FacultySection = () => {
  const [users, setUsers] = useState<Faculty[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/user/users?type=1"
        );
        setUsers(res.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <Table columns={columns}>
        {users.map((user) => (
          <tr>
            <TD data={user.name} />
            <TD data={user.email} />
            <TD
              data={
                user.problemStatements ? user.problemStatements.length : "0"
              }
            />
          </tr>
        ))}
      </Table>
    </div>
  );
};
