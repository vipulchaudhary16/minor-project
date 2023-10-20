// UnauthorizedPage.tsx

import React from "react";
import { Link } from "react-router-dom";

type ErrorProps = {
  errorName?: string;
  errortext?: string;
  nextDestination?: string;
  actionName: string;
};

const ErrorPage: React.FC<ErrorProps> = ({
  errorName,
  errortext,
  nextDestination = "/",
  actionName,
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-100 text-center">
      <div className="flex flex-col gap-4 items-center p-8 rounded">
        <h1 className="text-4xl font-bold mb-4">{errorName}</h1>
        <p className="text-gray-600">{errortext}</p>
        <button className="bg-primary-color text-white px-[1.5rem] py-[0.5rem] rounded-lg">
          <Link to={nextDestination} className="hover:underline">
            {actionName}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
