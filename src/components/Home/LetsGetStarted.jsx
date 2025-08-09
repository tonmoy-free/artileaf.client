import React from 'react';
import { Link } from 'react-router';


const LetsGetStarted = () => {
    return (
            <div className='h-auto py-16 md:h-[400px] bg-primary flex flex-col justify-center items-center space-y-6 mt-16 md:mt-24 lg:mt-32 mb-16 md:mb-24 lg:mb-32 px-4 text-center'>
                <h1 className='text-2xl md:text-4xl lg:text-5xl font-semibold text-white dark:text-white'>
                    Let's Get Started!
                </h1>
                <p className='text-base md:text-lg lg:text-xl font-medium text-white max-w-xl'>
                    Preserve and showcase your historical treasures — all in one place, just a click away!
                </p>
                <Link
                    to="/login/register"
                    className="btn btn-secondary hover:bg-white hover:text-primary text-base md:text-lg lg:text-xl text-white px-6 py-2"
                >
                    Register Now
                </Link>
            </div>
    );
};

export default LetsGetStarted;