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
import PrivateRouter from "./Component/AuthSection/PrivateRouter";
import JobDetails from "./Component/Pages/JobDetails";
import PrivateRoute from "./Component/AuthSection/PrivateRouter";
import AdminProfile from "./Component/Dashboard/AdminRoute/AdminProfile";
import Adminjobpost from "./Component/Dashboard/AdminRoute/Adminjobpost";
import Applicationmanagment from "./Component/Dashboard/AdminRoute/Applicationmanagment";
import EemployMangement from "./Component/Dashboard/EemployMangement";
import ContactSection from "./Component/Pages/Contactsection";
import UserProfile from "./Component/Dashboard/UserRoute/UserProfile";
import UserUploadCv from "./Component/Dashboard/UserRoute/UserUploadCv";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/viewalljobpost", element: <AllJobs /> },
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <Signup /> },
      { path: "/updatedJob/:id", element: <UpdateJob /> },
      {path:"/Contact", element:<ContactSection></ContactSection>},
      {
        path: "job-details/:id",
        element: <PrivateRouter><JobDetails /></PrivateRouter>
      },
     
      { path: "/add-job", element: <PrivateRouter><Addjob /></PrivateRouter> },
      { path: "/MyPostedJobs", element: <PrivateRouter><MyPostedJobs /></PrivateRouter> },
      { path: "/MyApplication", element: <PrivateRouter><MyApplication /></PrivateRouter> },
    ],
  },
  {
  
    path: "/Dashboard",
    element: <PrivateRouter><Dashboard /></PrivateRouter>,
    children: [
     
      {
        path: "adminProfile", 
        element: <AdminProfile />
      },
      {
        path: "Adminjobpost",
        element: <Adminjobpost />
      },
      {
        path: "Applicationmanagment",
        element: <Applicationmanagment />
      },
      {
        path: "EemployMangement",
        element: <EemployMangement />
      },
     
      {
        path: "adminProfile",
        element: <AdminProfile /> 
      },
      {
        path: "appliedJobs",
        element: <MyApplication />
      },
      {
 path:"userprofile",
 element:<UserProfile></UserProfile>
      },
      {
        path:"UserUploadCv",
        element:<UserUploadCv></UserUploadCv>
      }


    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
  </React.StrictMode>
);