import React from 'react';
import { Link } from 'react-router-dom';
const JobCard = ({ job }) => {
    const { job_title, deadline, price_range, short_description } = job;
    
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{job_title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {short_description}
                </p>
            </div>
            
            <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-600 font-semibold">{price_range}</span>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Deadline: {deadline}
                    </span>
                </div>
               <Link to={`/job-details/${job._id}`} className="w-full">
    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Job Details
    </button>
</Link>
            </div>
        </div>
    );
};

export default JobCard;