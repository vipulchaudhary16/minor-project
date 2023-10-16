import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../component/SideNav";
import ErrorPage from "../component/Unauthorised";
import { useSelector } from "react-redux";
import { userSelector } from "../store/user/user.selector";

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
    <>
      <div className="max-h-screen h-screen grid grid-cols-12">
        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-center">
          <SideNav role={role} />
        </div>
        <div className="col-span-12 lg:col-span-10">
          {isAuthenticated && user?.role === role ? (
            <Outlet />
          ) : (
            <ErrorPage
              errorName="Unauthorized Access"
              errortext="  Oops! It seems like you don't have permission to access this page."
              actionName="Go To Home"
            />
          )}
        </div>
      </div>
    </>
  );
};
