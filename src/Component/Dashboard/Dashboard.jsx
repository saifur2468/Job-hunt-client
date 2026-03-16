import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {useAuth} from "../AuthSection/Authprovider";
import {
    FaHome,
    FaUser,
    FaFileUpload,
    FaSearch,
    FaBriefcase,
    FaUsersCog,
    FaPlusSquare
} from "react-icons/fa";
import { MdContactMail, MdDashboard } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";

const Dashboard = () => {
    const { user } = useAuth();

   
    const isAdmin = user?.email === 'mdislamshakib218@gmail.com';

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-[#D1A054] text-white p-5 shadow-xl">
                <div className="mb-10 text-center uppercase border-b border-white/20 pb-4">
                    <h2 className="text-2xl font-bold leading-tight">Job Hunt</h2>
                    <p className="text-xs tracking-widest opacity-80">Dashboard</p>
                </div>

                <ul className="menu space-y-2">
                    {
                        isAdmin ? (
                            // --- ADMIN MENU ---
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile" className={({ isActive }) => `flex items-center gap-3 p-2 font-medium uppercase transition-all ${isActive ? 'text-white bg-black/30 rounded shadow-md' : 'text-black hover:bg-black/10'}`}>
                                        <FaUser className="text-xl" /> Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addJob" className={({ isActive }) => `flex items-center gap-3 p-2 font-medium uppercase transition-all ${isActive ? 'text-white bg-black/30 rounded shadow-md' : 'text-black hover:bg-black/10'}`}>
                                        <FaPlusSquare className="text-xl" /> Post a Job
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageApplications" className={({ isActive }) => `flex items-center gap-3 p-2 font-medium uppercase transition-all ${isActive ? 'text-white bg-black/30 rounded shadow-md' : 'text-black hover:bg-black/10'}`}>
                                        <FaUsersCog className="text-xl" /> Application Mgmt
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers" className={({ isActive }) => `flex items-center gap-3 p-2 font-medium uppercase transition-all ${isActive ? 'text-white bg-black/30 rounded shadow-md' : 'text-black hover:bg-black/10'}`}>
                                        <FaUsersCog className="text-xl" /> Manage Users
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            // --- NORMAL USER MENU ---
                            <>
                                <li>
                                    <NavLink to="/dashboard/userProfile" className={({ isActive }) => `flex items-center gap-3 p-2 font-medium uppercase transition-all ${isActive ? 'text-white bg-black/30 rounded shadow-md' : 'text-black hover:bg-black/10'}`}>
                                        <FaUser className="text-xl" /> My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/uploadCv" className={({ isActive }) => `flex items-center gap-3 p-2 font-medium uppercase transition-all ${isActive ? 'text-white bg-black/30 rounded shadow-md' : 'text-black hover:bg-black/10'}`}>
                                        <FaFileUpload className="text-xl" /> Upload CV
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/findJobs" className={({ isActive }) => `flex items-center gap-3 p-2 font-medium uppercase transition-all ${isActive ? 'text-white bg-black/30 rounded shadow-md' : 'text-black hover:bg-black/10'}`}>
                                        <FaSearch className="text-xl" /> Find Jobs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/appliedJobs" className={({ isActive }) => `flex items-center gap-3 p-2 font-medium uppercase transition-all ${isActive ? 'text-white bg-black/30 rounded shadow-md' : 'text-black hover:bg-black/10'}`}>
                                        <FaBriefcase className="text-xl" /> My Applied Jobs
                                    </NavLink>
                                </li>
                            </>
                        )
                    }

                    {/* Shared Links */}
                    <div className="divider border-t border-white/40 my-6"></div>
                    
                    <li>
                        <NavLink to="/" className="flex items-center gap-3 p-2 font-medium uppercase text-black hover:text-white transition-colors">
                            <GoHomeFill className="text-xl" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/allJobs" className="flex items-center gap-3 p-2 font-medium uppercase text-black hover:text-white transition-colors">
                            <FaBriefcase className="text-xl" /> All Jobs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="flex items-center gap-3 p-2 font-medium uppercase text-black hover:text-white transition-colors">
                            <MdContactMail className="text-xl" /> Contact Support
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-gray-100 p-8 min-h-screen overflow-y-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 min-h-[80vh]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;