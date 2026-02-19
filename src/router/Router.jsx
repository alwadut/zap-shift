import {  Component } from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/AuthPages/Login/Login";
import Regestation from "../pages/AuthPages/Regestation/Regestation";
import Coverage from "../pages/coverage/Coverage";
import SendPercel from "../pages/sendpercel/SendPercel";
import PrivateRoute from "../routes/PrivateRoute";
import DashBoardLayout from "../layout/DashBoardLayout";
import Myparcels from "../pages/Dashboard/Myparcels/Myparcels";
import DashboardHome from "../pages/Dashboard/Home/DashboardHome";
import Payment from "../pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:'coverage',
            Component:Coverage,
            loader:() => fetch('./warehouses.json')
        },
        {
          path:'sendPercel',
          element: <PrivateRoute><SendPercel/> </PrivateRoute>,
           loader:() => fetch('./warehouses.json')
        }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[  //jehetu eta special case nav footer sara tai jonne kuno doroner index true user kora jabe na korele nav r footer cole asbe 
      {
        path:'login',
        Component:Login,
      },
      {
        path:'register',
        Component:Regestation
      }
    ]
  },
  {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashBoardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index: true,   // default dashboard page
      element: <DashboardHome />
    },
    {
      path: "myparcels",
      element: <Myparcels />
    },
    {
      path: "payment/:id",
      Component: Payment
    },
    
  ]
}

]);