export type industryRequest = {
  _id: string;
  user: {
    _id: string;
    name: string;
    rollNo: string;
    email: string;
  };
  role: string;
  companyDetails: {
    companyName: string;
    companyAddress: {
      city: string;
      pincode: string;
      state: string;
      country: string;
      googleMapLink: string;
    };
    companyWebsite: string;
  };
  stipend: number;
  joiningDate: string;
  endingDate: string;
  offerLetter: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};