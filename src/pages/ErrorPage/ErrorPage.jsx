import React, { Suspense } from 'react';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router';
import error from '../../assets/404error.jpg';

const ErrorPage = () => {
    return (
        <div className='dark:bg-black'>
            <Navbar></Navbar>
            <Suspense fallback={<Loading></Loading>}>
                <div className='container mx-auto justify-center items-center mt-20 flex flex-col md:px-0 px-12 '>
                    <div className='px-8 py-8 border border-gray-200 shadow-2xl rounded-3xl mb-10'>
                        <img src={error} alt="" />
                    </div>
                    <p className='text-primary font-black text-2xl text-center md:text-5xl mb-5 dark:text-secondary'>404 - Page Not Found</p>
                    <p className='font-bold text-base text-center md:text-xl dark:text-white'>Oops ! The page you'r looking for doesn't exist</p>
                </div>
                <div className="flex justify-center items-center mt-4 md:mt-10 pb-20">
                    <Link to='/' className="hover:bg-primary hover:border-secondary border border-primary text-primary text-center rounded-4xl hover:text-white font-bold text-base md:text-xl md:px-7 md:py-4 px-5 py-[6px] cursor-pointer dark:text-white dark:hover:bg-secondary dark:border-secondary">Go Back Home</Link>
                </div>
            </Suspense>

        </div>
    );
};

export default ErrorPage;