import React, { useEffect } from 'react';
import Navbar from '../../components/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const HomeLayouts = () => {
    
    return (
        <div className='dark:bg-black'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayouts;