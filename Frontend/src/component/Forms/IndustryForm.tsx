import React, { useState } from 'react';
import InputField from './InputField'; // Assuming InputField is in the same directory

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
    role: '',
    companyName: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    companyWebsite: '',
    joiningDate: '',
    endingDate: '',
    offerLetter: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFormData((prev) => ({ ...prev, offerLetter: files ? files[0] : null }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="card p-[3.5rem] rounded-lg">
      <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-x-[3rem]">
        <InputField label="Role" type="text" name="role" value={formData.role} onChange={handleChange} />
        <InputField label="Company Name" type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
        <InputField label="City" type="text" name="city" value={formData.city} onChange={handleChange} />
        <InputField label="Pincode" type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
        <InputField label="State" type="text" name="state" value={formData.state} onChange={handleChange} />
        <InputField label="Country" type="text" name="country" value={formData.country} onChange={handleChange} />
        <InputField label="Google Map Link" type="text" name="googleMapLink" value={formData.googleMapLink || ''} onChange={handleChange} required={false} />
        <InputField label="Company Website" type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} />
        <InputField label="Stipend" type="number" name="stipend" value={formData.stipend?.toString() || ''} onChange={handleChange} required={false} />
        <InputField label="Joining Date" type="datetime-local" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
        <InputField label="Ending Date" type="datetime-local" name="endingDate" value={formData.endingDate} onChange={handleChange} />

        <div className="mb-[1.6rem]">
          <label className="block text-[1.2rem] font-semibold mb-[.8rem]">Offer Letter</label>
          <input
            type="file"
            name="offerLetter"
            onChange={handleFileChange}
            className="w-full px-[1.2rem] py-[.8rem] border rounded-md  focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]"
            required
          />
        </div>

        <button 
        type="submit" 
        className='col-start-2 w-1/3 ml-auto bg-primary-color text-white text-[1.3rem] font-semibold py-[.8rem] rounded-md hover:bg-[#557deb]'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default IndustryForm;
