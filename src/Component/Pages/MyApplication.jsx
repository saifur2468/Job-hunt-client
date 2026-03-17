import React, { useEffect, useState } from 'react';
import {useAuth} from '../AuthSection/Authprovider';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'; 

const MyApplication = () => {
    const { user } = useAuth();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/my-applications?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setAppliedJobs(data);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/delete-application/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Your application has been removed.", "success");
                        const remaining = appliedJobs.filter(job => job._id !== id);
                        setAppliedJobs(remaining);
                    }
                });
            }
        });
    };

    if (loading) return <div className="text-center py-20 font-bold text-xl">Loading your applications...</div>;

    return (
        <div className="container mx-auto my-12 px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-600 pb-2 inline-block">
                My Applied Jobs ({appliedJobs.length})
            </h2>

            <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-4 px-6 text-left">Job Title</th>
                            <th className="py-4 px-6 text-left">Salary Range</th>
                            <th className="py-4 px-6 text-left">Applied Date</th>
                            <th className="py-4 px-6 text-center">Status</th>
                            <th className="py-4 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {appliedJobs.length > 0 ? (
                            appliedJobs.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50 transition-colors border-b">
                                    <td className="py-4 px-6 font-semibold text-gray-700">{app.job_title}</td>
                                    <td className="py-4 px-6 text-gray-600">{app.price_range}</td>
                                    <td className="py-4 px-6 text-gray-600">{app.applied_date}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-4 py-1 rounded-full text-sm font-bold 
                                            ${app.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                                              app.status === 'Accepted' ? 'bg-green-100 text-green-600' : 
                                              'bg-red-100 text-red-600'}`}>
                                            {app.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button 
                                            onClick={() => handleDelete(app._id)}
                                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                            title="Delete Application"
                                        >
                                            <FaTrashAlt size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500 italic">
                                    You haven't applied for any jobs yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplication;