import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';

const JobTabs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/Category-jobs')
            .then(res => res.json())
            .then(data => setJobs(data))
            .catch(err => console.error("Data load failed:", err));
    }, []);


    const renderJobsByCategory = (categoryName) => {
        const filteredJobs = jobs.filter(job => job.category === categoryName);

        if (filteredJobs.length === 0) {
            return (
                <div className="col-span-full text-center py-10 text-gray-400 font-medium">
                    No jobs available in {categoryName} yet.
                </div>
            );
        }

        return filteredJobs.map(job => (
            <div key={job._id} className="card bg-base-100 shadow-xl border p-5 hover:scale-105 transition-all duration-300">
                <h2 className="card-title text-blue-600 font-bold">{job.job_title}</h2>
                <p className="text-gray-500 text-sm mt-2">{job.description?.substring(0, 100)}...</p>
                <div className="my-4 space-y-1">
                    <p className="font-bold text-gray-700">Price: {job.price_range}</p>
                    <p className="text-xs text-red-500 font-bold uppercase tracking-wider">
                        Deadline: {job.deadline}
                    </p>
                </div>
                <div className="card-actions justify-end">
                    <Link className="btn btn-primary btn-sm normal-case w-full">
                        Apply now
                    </Link>
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto my-16 px-4">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
                Browse Jobs By Category
            </h1>

            <Tabs>
                <div className="flex justify-center mb-10">
                    <TabList className="flex flex-wrap gap-4 border-b-0 justify-center">
                        <Tab className="btn btn-outline btn-primary px-6" selectedClassName="btn-active">Web Development</Tab>
                        <Tab className="btn btn-outline btn-primary px-6" selectedClassName="btn-active">UI/UX Design</Tab>
                        <Tab className="btn btn-outline btn-primary px-6" selectedClassName="btn-active">Graphics Design</Tab>
                        <Tab className="btn btn-outline btn-primary px-6" selectedClassName="btn-active">Backend Development</Tab>
                    </TabList>
                </div>

                {/* Web Development Panel */}
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {renderJobsByCategory('Web Development')}
                    </div>
                </TabPanel>

                {/* UI/UX Design Panel */}
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {renderJobsByCategory('UI/UX Design')}
                    </div>
                </TabPanel>

                {/* Graphics Design Panel */}
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {renderJobsByCategory('Graphics Design')}
                    </div>
                </TabPanel>

                {/* Backend Development Panel */}
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {renderJobsByCategory('Backend Development')}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default JobTabs;