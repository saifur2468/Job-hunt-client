import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../AuthSection/Authprovider'; 

const Navbar = () => {
    const { user, logout } = useAuth(); 

    const handleLogOut = async () => {
        try {
            await logout();
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

  
    const links = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>Home</NavLink></li>
            <li><NavLink to="/viewalljobpost" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>All Jobs</NavLink></li>
            
                <>
                    <li><NavLink to="/add-job" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>Add Job</NavLink></li>
                    <li><NavLink to="/MyApplication" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>My Applications</NavLink></li>
                    <li><NavLink to="/MyPostedJobs" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>My Posted Jobs</NavLink></li>
                     <li><NavLink to="/Dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>Dashboard</NavLink></li>
                      <li><NavLink to="/Contact" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>Contact</NavLink></li>
                </>
            
        </>
    );

    return (
        <div className="navbar bg-base-100/90 backdrop-blur-md shadow-md sticky top-0 z-50 px-2 lg:px-10 transition-all">
            <div className="navbar-start">
              
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
                        {links}
                    </ul>
                </div>

               
                <Link to="/" className="btn btn-ghost text-2xl font-bold tracking-tighter">
                    <span className="text-blue-600">Job</span>Hunting
                </Link>
            </div>

           
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 font-semibold text-gray-700">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online border-2 border-blue-500 hover:scale-105 transition-transform">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} alt="User" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-60 border border-gray-100">
                            <li className="p-3">
                                <p className="font-bold text-blue-600">{user?.displayName || "User Name"}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </li>
                            {/* <div className="divider my-0"></div>
                            <li><Link to="/profile">View Profile</Link></li> */}
                            <li className="p-2">
                                <button 
                                    onClick={handleLogOut} 
                                    className="btn btn-sm btn-error text-white w-full normal-case"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-outline btn-primary btn-sm px-6 rounded-lg hidden md:flex">Login</Link>
                        <Link to="/signUp" className="btn btn-primary btn-sm px-6 rounded-lg">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;