import React, { useEffect } from 'react';
import Banner from '../../components/Home/Banner/Banner';
import FeaturedArtifacts from '../../components/Home/FeaturedArtifacts/FeaturedArtifacts';
import { useLoaderData } from 'react-router';
import Faq from '../../components/Home/Faq';
import LetsGetStarted from '../../components/Home/LetsGetStarted';
import Subscribe from '../../components/Home/Subscribe';
import SpotLightSections from '../../components/Home/SpotLightSections';
import TimeTravel from '../../components/Home/TimeTravel';
import BannerTwo from '../../components/Home/BannerTwo';
import * as motion from "motion/react-client";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = ({ pageTitle }) => {
    const artifactsData = useLoaderData();
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true, // animation only triggers once
        });
    }, []);
    // console.log(artifactsData) 
    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Home'; // default pageTitle ArtiLeaf
    }, [pageTitle]);
    return (
        <div className='dark:bg-black'>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
            // style={ball}
            >
                <Banner></Banner>
            </motion.div>
            <div data-aos="fade-up">
                <FeaturedArtifacts artifactsData={artifactsData}></FeaturedArtifacts>
            </div>
            <div data-aos="flip-left">
                <BannerTwo></BannerTwo>
            </div>
            <div data-aos="zoom-in">
                <Faq></Faq>
            </div>
            <div data-aos="fade-up-left">
                <Subscribe></Subscribe>
            </div>
            <div data-aos="flip-right">
                <SpotLightSections artifactsData={artifactsData}></SpotLightSections>
            </div>
            <div data-aos="flip-up">
                <LetsGetStarted></LetsGetStarted>
            </div>
            <div data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine">
                <TimeTravel artifactsData={artifactsData}></TimeTravel>
            </div>
        </div>
    );
};

export default Home;