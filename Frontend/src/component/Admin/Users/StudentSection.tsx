import { useEffect, useState } from "react";
import { Table } from "../../Table/Table";
import axios from "axios";
import { toast } from "react-toastify";
import { TD } from "../../Table/TD";
import { Loader } from "../../Utils/Loader";

export type User = {
  _id: string;
  name: string;
  rollNo: string;
  email: string;
  group?: {
    _id: string;
    groupNumber: number;
  };
};

const columns = ["Name", "Roll No", "Email", "Group"];

export const StudentSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8080/api/user/users?type=2"
        );
        setUsers(res.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      {loading ? (
        <Loader heading="Loading users" />
      ) : (
        <Table columns={columns}>
          {users.map((user) => (
            <tr>
              <TD data={user.name} />
              <TD data={user.rollNo} />
              <TD data={user.email} />
              <TD data={user.group ? user.group.groupNumber : "No Group"} />
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
};
