import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../store/user/user.selector";
import ErrorPage from "../component/Utils/ErrorPage";

export const IsLoggedIN: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <ErrorPage
          errorName="LogIn Required"
          errortext="Oops! It seems like you have to login to access this page."
          actionName="Go To LogIn"
        />
      )}
    </>
  );
};
