import React from 'react';
import historyOne from '../../assets/photo/Antikythera Mechanism.png'
import historyTwo from '../../assets/photo/Magna Carta.png'
import { motion } from "motion/react"
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import AddArtifactWalk from '../../assets/lottie/ArtifactAddWalk.json';

const BannerTwo = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className="hero bg-base-200 min-h-96 dark:bg-black">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='flex-1 '>
                        {/* <motion.img
                            src={historyOne}
                            animate={{ y: [100, 150, 100] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            // className="max-w-sm border-s-8 border-b-8 border-primary rounded-t-[40px] rounded-br-[40px] shadow-2xl"
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md border-s-8 border-b-8 border-primary rounded-t-[40px] rounded-br-[40px] shadow-2xl hidden md:block "
                        />
                        <motion.img
                            src={historyTwo}
                            animate={{ x: [100, 150, 100] }}
                            transition={{ duration: 10, delay: 5, repeat: Infinity }}
                            className="max-w-sm border-s-8 border-b-8 border-secondary rounded-t-[40px] rounded-br-[40px] shadow-2xl hidden md:block md:max-w-md"
                        /> */}
                        <Lottie className='ml-70 hidden lg:block' style={{ width: '280px' }} animationData={AddArtifactWalk}  loop={true}></Lottie>
                    </div>
                    <div className='flex-1'>
                        <motion.h1
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, transition: { duration: 4 } }}
                            className="text-2xl md:text-5xl font-bold dark:text-white"><motion.span animate=
                                {{
                                    color: ['#0562af', '#dd3333', '#8A33FF'],
                                    transition: { duration: 2, repeat: Infinity }

                                }}
                            >ArtiLeaf</motion.span> for you!</motion.h1>
                        <p className="py-1 md:py-6 dark:text-white">
                            Any one can submit any historical item — tools, weapons, writings, sculptures, documents, etc. — as long as it has historical significance and accurate context.
                        </p>


                        <motion.div
                            animate={{ x: [0, 150, 0] }}
                            transition={{ duration: 15, delay: 0, repeat: Infinity }}
                        >
                            <Link to={`/addArtifacts`}>
                                <button className="btn btn-primary">Add Artifacts</button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerTwo;