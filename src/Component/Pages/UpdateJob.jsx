import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateJob = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/job/${id}`)
            .then(res => res.json())
            .then(data => setJob(data));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedJob = {
            job_title: form.job_title.value,
            category: form.category.value,
            deadline: form.deadline.value,
            min_price: form.min_price.value,
            max_price: form.max_price.value,
            description: form.description.value,
        };

        fetch(`http://localhost:5000/update-job/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedJob)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Job details updated successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                } else {
                    Swal.fire({
                        title: "Info",
                        text: "No changes were made.",
                        icon: "info",
                        confirmButtonText: "OK"
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card w-full max-w-2xl shadow-2xl bg-base-100 p-10 border">
                <h2 className="text-3xl font-bold text-center mb-6">Update Job Information</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="form-control">
                        <label className="label font-bold">Job Title</label>
                        <input name="job_title" defaultValue={job.job_title} className="input input-bordered" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label font-bold">Category</label>
                            <select name="category" defaultValue={job.category} className="select select-bordered">
                                <option>Web Development</option>
                                <option>Graphics Design</option>
                                <option>Digital Marketing</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Deadline</label>
                            <input name="deadline" type="date" defaultValue={job.deadline?.split('T')[0]} className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="min_price" defaultValue={job.min_price} placeholder="Min Price" className="input input-bordered" type="number" required />
                        <input name="max_price" defaultValue={job.max_price} placeholder="Max Price" className="input input-bordered" type="number" required />
                    </div>
                    <textarea name="description" defaultValue={job.description} className="textarea textarea-bordered h-32" placeholder="Description" required></textarea>
                    <button className="btn btn-primary w-full text-lg">Update Now</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateJob;