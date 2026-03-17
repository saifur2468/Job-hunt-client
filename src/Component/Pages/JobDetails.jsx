import React, { useEffect, useState } from 'react';
import { useParams, Link, } from 'react-router-dom';
import { FaLocationArrow, FaBriefcase, FaDollarSign, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '../AuthSection/Authprovider';
import Swal from 'sweetalert2';
const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/job/${id}`)
            .then(res => res.json())
            .then(data => setJob(data));
    }, [id]);

    const handleApply = () => {
        if (!user) {
            alert("Please login to apply!");
            return navigate('/login');
        }

        const applicationData = {
            job_id: job._id,
            job_title: job.job_title,
            price_range: job.price_range,
            category: job.category,
            applicant_email: user?.email,
            applicant_name: user?.displayName,
            applied_date: new Date().toLocaleDateString(),
            status: 'Pending'
        };

        fetch('http://localhost:5000/apply-job', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(applicationData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Applied Successfully!",
                        text: "Your application is currently pending admin approval.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    // navigate('/dashboard/myApplications');
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please try again.",
                });
            });

    };

    if (!job) return <div className="text-center my-20 font-bold text-2xl">Loading Details...</div>;

    const {
        job_title, job_time, location, deadline, price_range,
        education, requirements, benefits, responsibilities, short_description
    } = job;

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">

                <div className="p-8 border-b border-gray-100">
                    <Link to="/" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1 mb-6">
                        Back Home Page
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{job_title}</h1>
                            <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600">
                                <span className="flex items-center gap-1"><FaLocationArrow className="text-blue-500" /> {location}</span>
                                <span className="flex items-center gap-1"><FaBriefcase className="text-blue-500" /> {job_time}</span>
                                <span className="flex items-center gap-1"><FaDollarSign className="text-blue-500" /> {price_range} per project</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 text-sm">Salary Range</p>
                            <p className="text-2xl font-bold text-gray-700">{price_range}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <section>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">The Role:</h3>
                        <p className="text-gray-600 leading-relaxed">{short_description}</p>
                    </section>

                    <section className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                        <FaGraduationCap className="text-2xl text-blue-600" />
                        <div>
                            <h4 className="font-bold text-gray-800">Education Requirement:</h4>
                            <p className="text-gray-600">{education}</p>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-2">Technical Skills</h3>
                            <ul className="space-y-2 text-gray-600">
                                {requirements?.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 border-l-4 border-green-500 pl-2">Key Responsibilities</h3>
                            <ul className="space-y-2 text-gray-600">
                                {responsibilities?.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-2">Perks & Benefits</h3>
                            <ul className="space-y-2 text-gray-600">
                                {benefits?.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-red-500 font-bold">
                            <FaCalendarAlt />
                            <span>Deadline: {deadline}</span>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <button
                                onClick={handleApply}
                                className="flex-1 md:flex-none px-10 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-all uppercase tracking-wider"
                            >
                                Apply Now
                            </button>
                            <button className="flex-1 md:flex-none px-6 py-3 border border-blue-600 text-blue-600 font-bold rounded-md hover:bg-blue-50 transition-all">
                                Bookmark
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;