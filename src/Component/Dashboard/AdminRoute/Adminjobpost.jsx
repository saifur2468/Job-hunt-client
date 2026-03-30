import React, { useState } from 'react';
import { useAuth } from '../../AuthSection/Authprovider';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

const Addminjobpost = () => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const jobData = {
            employer_email: user?.email,
            job_title: form.job_title.value,
            deadline: startDate,
            category: form.category.value,
            min_price: parseFloat(form.min_price.value),
            max_price: parseFloat(form.max_price.value),
            description: form.description.value,
            buyer: {
                email: user?.email,
                name: user?.displayName,
                photo: user?.photoURL
            }
        };

        try {
            const response = await fetch('https://kidimuservercholena.vercel.app/add-job', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(jobData)
            });

            const data = await response.json();

            if (data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Job Posted Successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                });

                form.reset();
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error"
            });
        }
    };

    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-80px)] my-12'>
            <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-2xl border w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-gray-700 capitalize text-center mb-6">Post a New Job</h2>

                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 font-semibold">Email Address</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                readOnly
                                className="block w-full px-4 py-2 mt-2 text-gray-500 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold">Job Title</label>
                            <input
                                name="job_title"
                                required
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-700 font-semibold mb-2">Deadline</label>
                            <DatePicker
                                className='block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold">Category</label>
                            <select
                                name="category"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="UI/UX Designer">UI/UX Designer</option>
                                <option value="Network Engineer">Network Engineer</option>
                                <option value="SQA Engineer">SQA Engineer</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold">Minimum Price</label>
                            <input
                                name="min_price"
                                required
                                type="number"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold">Maximum Price</label>
                            <input
                                name="max_price"
                                required
                                type="number"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <label className="text-gray-700 font-semibold">Description</label>
                        <textarea
                            name="description"
                            required
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 w-full md:w-auto font-bold"
                        >
                            Add Job
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Addminjobpost;