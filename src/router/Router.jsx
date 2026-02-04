import {  Component } from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/AuthPages/Login/Login";
import Regestation from "../pages/AuthPages/Regestation/Regestation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index:true,
            Component:Home
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
        path:'regestation',
        Component:Regestation
      }
    ]
  },
]);