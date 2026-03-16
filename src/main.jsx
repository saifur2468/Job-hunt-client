import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import MainLayout from "./Component/MainLayout";
import Error from "./Component/Pages/Error";
import HomePage from "./Component/Pages/HomePage";
import AllJobs from "./Component/Pages/Pagination";
import Login from "./Component/AuthSection/Login";
import Signup from "./Component/AuthSection/Signup";
import AuthProvider from "./Component/AuthSection/Authprovider";
import Addjob from "./Component/Pages/Addjob";
import MyPostedJobs from "./Component/Pages/MyPostedJobs";
import UpdateJob from "./Component/Pages/UpdateJob";
import MyApplication from "./Component/Pages/MyApplication";
import Dashboard from "./Component/Dashboard/Dashboard";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path:"/viewalljobpost",
        element:<AllJobs></AllJobs>
      },
      {
        path:"/add-job",
        element:<Addjob></Addjob>

      },
      {
        path:"/MyPostedJobs",
        element:<MyPostedJobs></MyPostedJobs>
      },
      {
        path:"/MyApplication",
        element:<MyApplication></MyApplication>
      },
      {
        path:"/updatedJob/:id",
        element:<UpdateJob></UpdateJob>

      },
      {
      path:"/Dashboard",
      element:<Dashboard></Dashboard>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/signUp",
        element:<Signup></Signup>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
  </React.StrictMode>
);