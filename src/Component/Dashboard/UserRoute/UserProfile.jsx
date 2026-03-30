import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthSection/Authprovider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { User, Briefcase, CheckCircle, XCircle, Clock, MapPin, Mail, CalendarDays } from 'lucide-react';

const UserProfile = () => {
    const { user } = useAuth();
    const [applicationStats, setApplicationStats] = useState({
        totalApplied: 0,
        accepted: 0,
        rejected: 0,
        pending: 0
    });

    useEffect(() => {
        if (user?.email) {

            fetch(`https://kidimuservercholena.vercel.app/my-applications?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    const accepted = data.filter(app => app.status === 'Accepted').length;
                    const rejected = data.filter(app => app.status === 'Rejected').length;
                    const pending = data.filter(app => app.status === 'Pending' || !app.status).length;

                    setApplicationStats({
                        totalApplied: data.length,
                        accepted,
                        rejected,
                        pending
                    });
                });
        }
    }, [user?.email]);

    const chartData = [
        { name: 'Applied', count: applicationStats.totalApplied, color: '#3B82F6' },
        { name: 'Accepted', count: applicationStats.accepted, color: '#10B981' },
        { name: 'Rejected', count: applicationStats.rejected, color: '#EF4444' },
        { name: 'Pending', count: applicationStats.pending, color: '#F59E0B' },
    ];

    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                <div className="avatar">
                    <div className="w-28 rounded-full ring-4 ring-blue-100 ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL} alt="User" />
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {user?.displayName}
                        </h1>
                        <div className="badge badge-info gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider">
                            <User size={14} /> Job Seeker
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-gray-600">
                        <span className="flex items-center gap-2"><Mail size={16} className="text-blue-500" /> {user?.email}</span>
                        <span className="flex items-center gap-2"><MapPin size={16} className="text-blue-500" /> Bangladesh</span> {/* ডাইনামিক করতে পারেন */}
                        <span className="flex items-center gap-2"><CalendarDays size={16} className="text-blue-500" /> Joined: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}</span>
                    </div>
                    <button className="btn btn-primary btn-sm rounded-full px-6 mt-2">Edit Profile</button>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Briefcase />} label="Total Applied" value={applicationStats.totalApplied} color="text-blue-600" bg="bg-blue-100" />
                <StatCard icon={<CheckCircle />} label="Accepted" value={applicationStats.accepted} color="text-green-600" bg="bg-green-100" />
                <StatCard icon={<XCircle />} label="Rejected" value={applicationStats.rejected} color="text-red-600" bg="bg-red-100" />
                <StatCard icon={<Clock />} label="Pending Review" value={applicationStats.pending} color="text-yellow-600" bg="bg-yellow-100" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-gray-800">Application Activity</h3>
                        <select className="select select-bordered select-sm rounded-full text-xs">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Account Overview</h3>
                    <div className="space-y-4">
                        <InfoRow label="Profile Completion" value="85%" isBar valueColor="text-blue-600" />
                        <InfoRow label="Resume Uploaded" value="Yes (PDF)" valueColor="text-green-600" />
                        <InfoRow label="Member Since" value={user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'} />
                        <InfoRow label="Account Status" value="Active" valueColor="text-green-600" />
                    </div>
                    <div className="divider my-0"></div>
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Quick Actions</h4>
                        <div className="flex flex-wrap gap-2">
                            <button className="btn btn-xs btn-outline rounded-full">Upload New CV</button>
                            <button className="btn btn-xs btn-outline rounded-full">Job Alerts</button>
                            <button className="btn btn-xs btn-outline rounded-full">Privacy Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const StatCard = ({ icon, label, value, color, bg }) => (
    <div className="p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 bg-white transition-all hover:shadow-md">
        <div className={`p-4 rounded-2xl ${bg} ${color}`}>
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>
        </div>
    </div>
);


const InfoRow = ({ label, value, isBar, valueColor = "text-gray-800" }) => (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
        <span className="text-gray-600 text-sm font-medium">{label}</span>
        {isBar ? (
            <div className="flex items-center gap-2">
                <progress className="progress progress-primary w-24 h-1.5" value={value.replace('%', '')} max="100"></progress>
                <span className={`text-sm font-bold ${valueColor}`}>{value}</span>
            </div>
        ) : (
            <span className={`text-sm font-semibold ${valueColor}`}>{value}</span>
        )}
    </div>
);

export default UserProfile;