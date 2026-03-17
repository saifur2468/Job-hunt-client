import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Applicationmanagment = () => {
    const [allApplications, setAllApplications] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch('http://localhost:5000/all-applications') 
            .then(res => res.json())
            .then(data => {
                setAllApplications(data);
                setLoading(false);
            });
    }, []);

  
    const handleStatusUpdate = (id, newStatus) => {
        fetch(`http://localhost:5000/update-status/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: `Application status is now ${newStatus}`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });

               
                const remaining = allApplications.map(app => 
                    app._id === id ? { ...app, status: newStatus } : app
                );
                setAllApplications(remaining);
            }
        });
    };

    if (loading) return <div className="text-center py-20 font-bold text-xl text-blue-600">Loading Applications...</div>;

    return (
        <div className="container mx-auto my-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 border-b-4 border-blue-500 pb-3 inline-block">
                Application Management Panel
            </h2>

            <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-100">
                <table className="table w-full">
                 
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-5 px-6">Applicant</th>
                            <th className="py-5 px-6 text-left">Applied Job</th>
                            <th className="py-5 px-6 text-center">Status</th>
                            <th className="py-5 px-6 text-center">Set Decision</th>
                        </tr>
                    </thead>
                    
                   
                    <tbody>
                        {allApplications.length > 0 ? (
                            allApplications.map((app) => (
                                <tr key={app._id} className="hover:bg-blue-50/50 transition-colors border-b">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-blue-100 text-blue-600 rounded-full w-10">
                                                    <span className="text-sm font-bold">{app.applicant_name?.slice(0, 1)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{app.applicant_name}</div>
                                                <div className="text-sm opacity-60">{app.applicant_email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-medium text-gray-700">{app.job_title}</span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{app.category || 'Job'}</span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                            ${app.status === 'Accepted' ? 'bg-green-100 text-green-700' : 
                                              app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                                              'bg-yellow-100 text-yellow-700'}`}>
                                            {app.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => handleStatusUpdate(app._id, 'Accepted')}
                                                disabled={app.status === 'Accepted'}
                                                className="btn btn-sm btn-success text-white hover:scale-105"
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                                                disabled={app.status === 'Rejected'}
                                                className="btn btn-sm btn-error text-white hover:scale-105"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-20 text-gray-500 font-medium italic">
                                    No applications found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applicationmanagment;