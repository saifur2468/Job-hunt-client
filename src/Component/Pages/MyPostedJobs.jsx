import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthSection/Authprovider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyPostedJobs = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/my-jobs/${user?.email}`)
                .then(res => res.json())
                .then(data => setJobs(data));
        }
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3d5af1",
            cancelButtonColor: "#fb3b1e",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/job/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your job has been removed.", "success");
                            setJobs(jobs.filter(job => job._id !== id));
                        }
                    });
            }
        });
    };

    return (
        <div className="container mx-auto my-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">My Posted Jobs ({jobs.length})</h2>
            <div className="overflow-x-auto shadow-2xl rounded-xl border">
                <table className="table w-full">
                    <thead className="bg-blue-600 text-white text-lg">
                        <tr>
                            <th>#</th>
                            <th>Job Title</th>
                            <th>Category</th>
                            <th>Price Range</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                                <td>{index + 1}</td>
                                <td className="font-bold">{job.job_title}</td>
                                
                                <td><span className="badge badge-ghost font-semibold">{job.category}</span></td>
                                <td>${job.min_price} - ${job.max_price}</td>
                                <td className="space-x-2">
                                    <Link to={`/updatedJob/${job._id}`} className="btn btn-sm btn-info text-white">Update</Link>
                                    <button onClick={() => handleDelete(job._id)} className="btn btn-sm btn-error text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;