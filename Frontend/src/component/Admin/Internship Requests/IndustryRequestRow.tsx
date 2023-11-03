import React from "react";
import { industryRequest } from "../../../types/industryRequest";
import { TD } from "../../Table/TD";
import { formatDateToYyyyMmDd } from "../../../utilFunctions/functions";
import PopUp from "../../Utils/PopUp";
import { InternshipRequestRespond } from "../../Forms/InternshipRequestRespond";
import PDFViewerWrapper from "../../Utils/PDFViewer";

interface CardProps {
  request: industryRequest;
}

export const IndustryRequest: React.FC<CardProps> = ({ request }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPdfOpen, setIsPdfOpen] = React.useState(false);

  return (
    <>
      <tr>
        <TD data={request.user.name + "( " + request.user.rollNo + " )"} />
        <TD data={request.role} />
        <TD data={""}>
          <a href={request.offerLetter} target="_blank" rel="noreferrer">
            View
          </a>
        </TD>
        <TD data={""}>
          <a
            href={request.companyDetails.companyWebsite}
            target="_blank"
            rel="noreferrer"
          >
            {request.companyDetails.companyName}
          </a>
        </TD>
        <TD data={""}>
          {request.companyDetails.companyAddress.city +
            ", " +
            request.companyDetails.companyAddress.pincode +
            ", " +
            request.companyDetails.companyAddress.state}
        </TD>
        <TD data={formatDateToYyyyMmDd(new Date(request.joiningDate))} />
        <TD data={formatDateToYyyyMmDd(new Date(request.endingDate))} />
        <TD data={request.stipend} />
        <TD data={request.status} />
        <TD>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary-color text-white px-[1.5rem] py-[0.5rem] rounded-lg"
          >
            Respond
          </button>
        </TD>
      </tr>
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} heading="Update request">
        <InternshipRequestRespond id={request._id} />
      </PopUp>
      <PopUp isOpen={isPdfOpen} setIsOpen={setIsPdfOpen} heading="Offer Letter">
        <PDFViewerWrapper url={request.offerLetter} />
      </PopUp>
    </>
  );
};
