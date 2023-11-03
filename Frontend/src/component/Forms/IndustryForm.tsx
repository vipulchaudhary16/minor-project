import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import { formatDateToYyyyMmDd } from "../../utilFunctions/functions";

interface FormData {
  role: string;
  companyName: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  googleMapLink?: string;
  companyWebsite: string;
  stipend?: number;
  joiningDate: string;
  endingDate: string;
  offerLetter: File | null;
}

const IndustryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    role: "",
    companyName: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    companyWebsite: "",
    joiningDate: "",
    endingDate: "",
    offerLetter: null,
  });
  const [offerLetterLink, setOfferLetterLink] = useState<string>("");

  useEffect(() => {
    getRequest();
  }, []);

  const getRequest = async () => {
    const res = await axios.get(`http://localhost:8080/api/industry`);
    const data = res.data[0];
    const alreadySubmittedData = {
      role: data.role,
      companyName: data.companyDetails.companyName,
      city: data.companyDetails.companyAddress.city,
      pincode: data.companyDetails.companyAddress.pincode,
      state: data.companyDetails.companyAddress.state,
      country: data.companyDetails.companyAddress.country,
      googleMapLink: data.companyDetails.companyAddress.googleMapLink,
      companyWebsite: data.companyDetails.companyWebsite,
      stipend: data.stipend,
      joiningDate: formatDateToYyyyMmDd(new Date(data.joiningDate)),
      endingDate: formatDateToYyyyMmDd(new Date(data.endingDate)),
      offerLetter: null,
    };
    setOfferLetterLink(data.offerLetter);
    setFormData(alreadySubmittedData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFormData((prev) => ({ ...prev, offerLetter: files ? files[0] : null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("role", formData.role);
    newFormData.append("companyName", formData.companyName);
    newFormData.append("city", formData.city);
    newFormData.append("pincode", formData.pincode);
    newFormData.append("state", formData.state);
    newFormData.append("country", formData.country);
    newFormData.append("companyWebsite", formData.companyWebsite);
    newFormData.append("joiningDate", formData.joiningDate);
    newFormData.append("endingDate", formData.endingDate);
    if (formData.googleMapLink) {
      newFormData.append("googleMapLink", formData.googleMapLink);
    }
    if (formData.stipend) {
      newFormData.append("stipend", formData.stipend.toString());
    }
    if (formData.offerLetter) {
      newFormData.append("offerLetter", formData.offerLetter);
    }
    const res = await axios.post(
      `http://localhost:8080/api/industry/create`,
      newFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
  };

  return (
    <div className="card p-[3.5rem] rounded-lg">
      <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-x-[3rem]">
        <InputField
          label="Role"
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        <InputField
          label="Company Name"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
        <InputField
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <InputField
          label="Pincode"
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        <InputField
          label="State"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <InputField
          label="Country"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <InputField
          label="Google Map Link"
          type="text"
          name="googleMapLink"
          value={formData.googleMapLink || ""}
          onChange={handleChange}
          required={false}
        />
        <InputField
          label="Company Website"
          type="text"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
        />
        <InputField
          label="Stipend"
          type="number"
          name="stipend"
          value={formData.stipend?.toString() || ""}
          onChange={handleChange}
          required={false}
        />
        <InputField
          label="Joining Date"
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
        />
        <InputField
          label="Ending Date"
          type="date"
          name="endingDate"
          value={formData.endingDate}
          onChange={handleChange}
        />

        <div className="mb-[1.6rem]">
          {offerLetterLink ? (
            <a
              href={offerLetterLink}
              target="_blank"
              rel="noreferrer"
              className="block text-[1.2rem] font-semibold mb-[.8rem]"
            >
              Click here for Offer Letter
            </a>
          ) : (
            <>
              <label className="block text-[1.2rem] font-semibold mb-[.8rem]">
                Offer Letter
              </label>
            </>
          )}
          <input
            type="file"
            name="offerLetter"
            disabled={!!offerLetterLink}
            onChange={handleFileChange}
            className="w-full px-[1.2rem] py-[.8rem] border rounded-lg  focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]"
            required
          />
        </div>

        <button
          type="submit"
          className="col-start-2 w-1/3 ml-auto mt-[1rem] bg-primary-color text-white text-[1.3rem] font-semibold py-[.8rem] rounded-lg hover:bg-[#557deb]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default IndustryForm;
