import React from 'react';
import Hero from './Hero';
import Status from './Status';
import HotJob from './HotJob';
import JobTabs from './JobTabs';

const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <Status></Status>
            <JobTabs></JobTabs>
            <HotJob></HotJob>
            
        </div>
    );
};

export default HomePage;