import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true); // 🔥 loading state
    const itemsPerPage = 10;

    useEffect(() => {
        fetch('https://kidimuservercholena.vercel.app/jobsCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, []);

    useEffect(() => {
        setLoading(true); // 🔥 start loading when page changes

        fetch(`https://kidimuservercholena.vercel.app/jobs?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoading(false); // 🔥 stop loading
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [currentPage]);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-left mb-10">
                Available Jobs ({count})
            </h2>

            {/* 🔥 Spinner */}
            {
                loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {jobs.map(job => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                )
            }

            {/* Pagination UI */}
            <div className="flex justify-center mt-12 gap-2 flex-wrap">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >Prev</button>

                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 border rounded transition-all ${
                            currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        {page + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(numberOfPages - 1, prev + 1))}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >Next</button>
            </div>
        </div>
    );
};

export default AllJobs;