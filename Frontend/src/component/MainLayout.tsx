import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen grid grid-cols-12">
      <div className="hidden lg:block lg:col-span-2">
        <SideNav />
      </div>
      <div className="col-span-12 lg:col-span-10">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
