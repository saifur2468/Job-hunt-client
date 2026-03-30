import React, { useEffect, useState } from 'react';

const HotJob = () => {
    const [hotjobs, setHotjobs] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch('https://kidimuservercholena.vercel.app/Hot-job')
            .then(res => res.json())
            .then(data => {
                setHotjobs(data);
                setLoading(false); 
            })
            .catch(err => {
                console.error("Error fetching hot jobs:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-2 mb-8 ">
                <span className="flex h-3 w-3 rounded-full bg-red-500 animate-ping "></span>
                <h2 className="text-3xl font-bold text-gray-800 ">Hot Jobs</h2>
            </div>

            {/* 🔥 Spinner */}
            {
                loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            hotjobs.length > 0 ? (
                                hotjobs.map((job, index) => (
                                    <div key={index} className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl border-2 border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">

                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                                            {job.job_title}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {job.short_description}
                                        </p>

                                        <div className="flex justify-between items-center mt-4">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Salary Range</p>
                                                <p className="text-lg font-bold text-green-600">{job.price_range}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Deadline</p>
                                                <p className="text-sm font-medium text-red-500">{job.deadline}</p>
                                            </div>
                                        </div>

                                        <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-300">
                                            Apply Job
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-full text-gray-500">No jobs found</p>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default HotJob;