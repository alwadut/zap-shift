import React from "react";
import { Outlet, Link } from "react-router-dom"; // Assuming you use react-router

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Navbar for Mobile */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-bold">HormoFlow Admin</div>
        </div>

        {/* Page Content Starts Here */}
            <Outlet></Outlet>

      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content */}
          <li className="mb-4 text-xl font-bold px-4">Dashboard</li>
          <li><Link to="/dashboard">Overview</Link></li>
          <li><Link to="/dashboard/payout">Payout Settings</Link></li>
          <li><Link to="/dashboard/users">Manage Users</Link></li>
          <div className="divider"></div>
          <li><Link to="/">Back to Home</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;