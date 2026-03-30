import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthSection/Authprovider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FaUserShield, FaBriefcase, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

const AdminProfile = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalApplications: 0,
        accepted: 0,
        rejected: 0,
        pending: 0
    });

    useEffect(() => {

        fetch('https://kidimuservercholena.vercel.app/all-applications')
            .then(res => res.json())
            .then(data => {
                const accepted = data.filter(app => app.status === 'Accepted').length;
                const rejected = data.filter(app => app.status === 'Rejected').length;
                const pending = data.filter(app => app.status === 'Pending' || !app.status).length;

                setStats({
                    totalApplications: data.length,
                    accepted,
                    rejected,
                    pending
                });
            });
    }, []);


    const chartData = [
        { name: 'Total', count: stats.totalApplications, color: '#3B82F6' },
        { name: 'Accepted', count: stats.accepted, color: '#10B981' },
        { name: 'Rejected', count: stats.rejected, color: '#EF4444' },
        { name: 'Pending', count: stats.pending, color: '#F59E0B' },
    ];

    return (
        <div className="p-6 space-y-8">

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center gap-6">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL || "https://i.ibb.co/mR6h9yH/user.png"} alt="Admin" />
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
                        {user?.displayName} <FaUserShield className="text-yellow-400 text-xl" />
                    </h1>
                    <p className="opacity-90 mt-1 text-lg">{user?.email}</p>
                    <div className="badge badge-warning mt-3 py-3 px-4 font-bold">SYSTEM ADMINISTRATOR</div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FaBriefcase />} label="Total Applied" value={stats.totalApplications} color="text-blue-600" bg="bg-blue-100" />
                <StatCard icon={<FaCheckCircle />} label="Accepted" value={stats.accepted} color="text-green-600" bg="bg-green-100" />
                <StatCard icon={<FaTimesCircle />} label="Rejected" value={stats.rejected} color="text-red-600" bg="bg-red-100" />
                <StatCard icon={<FaHourglassHalf />} label="Pending" value={stats.pending} color="text-yellow-600" bg="bg-yellow-100" />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Application Analytics</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Account Details</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Status</span>
                            <span className="text-green-600 font-semibold">Active</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Last Login</span>
                            <span className="font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Role</span>
                            <span className="font-medium">Administrator</span>
                        </div>
                        <button className="btn btn-outline btn-primary btn-block mt-4">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const StatCard = ({ icon, label, value, color, bg }) => (
    <div className={`p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 bg-white`}>
        <div className={`p-4 rounded-xl ${bg} ${color} text-2xl`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <p className={`text-2xl font-bold text-gray-800`}>{value}</p>
        </div>
    </div>
);

export default AdminProfile;