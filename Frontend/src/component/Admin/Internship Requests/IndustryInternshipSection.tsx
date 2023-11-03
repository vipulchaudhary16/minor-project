import { useEffect, useState } from "react";
import { industryRequest } from "../../../types/industryRequest";
import axios from "axios";
import PageHeading from "../../Utils/PageHeading";
import { Table } from "../../Table/Table";
import { IndustryRequest } from "./IndustryRequestRow";

const columns = [
  "Student",
  "Role",
  "Offer Letter",
  "Company",
  "Company Address",
  "Joining Date",
  "Ending Date",
  "Stipend",
  "Status",
  "Action",
];

export const IndustryInternshipSection = () => {
  const [data, setData] = useState<industryRequest[]>([]);

  useEffect(() => {
    getRequest();
  }, []);

  const getRequest = async () => {
    const res = await axios.get(`http://localhost:8080/api/industry`);
    setData(res.data);
  };
  return (
    <div className="max-h-screen p-[6rem] overflow-auto">
      <PageHeading title="Industry Internships" />
      <Table columns={columns}>
        {data.map((request) => (
          <IndustryRequest request={request} />
        ))}
      </Table>
    </div>
  );
};
