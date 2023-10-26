import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../store/user/user.selector";
import DefaultLayout from "../layout/DefaultLayout";
import ErrorPage from "../component/Unauthorised";

interface RoleBaseRoutingProps {
  role: number;
}

export const RoleBaseRouting: React.FC<RoleBaseRoutingProps> = ({ role }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      if (user.role === role) {
        setIsAuthenticated(true);
      }
    }
  }, [user]);

  return (
    <DefaultLayout role={role}>
      {isAuthenticated && user?.role === role ? (
        <Outlet />
      ) : (
        <ErrorPage
          errorName="Unauthorized Access"
          errortext="Oops! It seems like you don't have permission to access this page."
          actionName="Go To Home"
        />
      )}
    </DefaultLayout>
  );
};