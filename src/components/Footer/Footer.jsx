import React from 'react';
import artileafLogoWhite from '../../assets/logo/artileafwhite.png';
import artileafLogoBlue from '../../assets/logo/artileafBlue.png';
import fbLogo from '../../assets/icon/fbl.png';
import XLogo from '../../assets/icon/teitter.png';
import gitLogo from '../../assets/icon/githubL.png';
import youtubeLogo from '../../assets/icon/youtube.png';
import { Link } from 'react-router';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { GrLocation } from 'react-icons/gr';
import { IoCallOutline } from 'react-icons/io5';
import { LuSend } from 'react-icons/lu';



const Footer = () => {
    return (
        <div className='bg-gray-800 dark:bg-black'>
            <div className='container mx-auto pt-15'>
                <div
                    className="container mx-auto flex flex-col md:flex-row  p-5 md:p-3 pt-10 pb-0 text-white">
                    {/* footer left part  */}
                    <div className="flex-1 space-y-3 ">
                        <div className='md:pl-5 pl-0 flex md:justify-start justify-center items-center'>
                            <Link to='/'>
                                {/* <p className=" text-3xl font-semibold cursor-pointer text-white"><span className='text-white'>Green</span><span className='text-[#e2136e]'>Leaf</span></p> */}
                                <img src={artileafLogoWhite} className='md:w-50 w-35' alt="" />
                            </Link>
                        </div>
                        <div className='flex md:justify-start justify-center items-center gap-4 hover:text-secondary'>
                            <p className='hidden md:block'><IoMdInformationCircleOutline className='text-xl' /></p>
                            <p className='text-lg font-semibold  cursor-pointer text-center md:text-start'>Contact info </p>
                        </div>

                        <div className="flex  items-center gap-3">
                            <GrLocation className='text-2xl pt-1 hidden md:block' />
                            <p className="text-xl text-center md:text-start">ArtiLeaf Tower,
                                Tikatuli, Mutashop <br /> Road, Jaupol-1236,
                                Dhaka, Bangladesh</p>
                        </div>
                        <div className="flex  items-center gap-3 justify-center md:justify-start">
                            <IoCallOutline className='text-2xl pt-0' />
                            <p className="text-lg">01677 057 845 </p>
                        </div>
                        <div className="flex  items-center gap-3 justify-center md:justify-start">
                            <LuSend className='text-2xl pt-1' />
                            <p className="text-lg">artileaf@artileaf.com</p>
                        </div>

                        <div className="flex gap-2 pl-3 md:pl-6 justify-center md:justify-start">
                            <div
                                className="bg-main_color rounded-full flex items-center justify-center w-11 h-11 hover:bg-secondary ease-in duration-500 cursor-pointer">
                                <Link to='https://www.facebook.com/profile.php?id=100011011145370' target="_blank"><img className='w-7' src={fbLogo} alt="" /></Link>

                            </div>

                            <div
                                className="bg-main_color rounded-full flex items-center justify-center w-11 h-11 hover:bg-secondary ease-in duration-500 cursor-pointer">
                                <Link to='https://x.com/' target="_blank"><img className='w-6' src={XLogo} alt="" /></Link>
                            </div>

                            <div
                                className="bg-main_color rounded-full flex items-center justify-center w-11 h-11 hover:bg-secondary ease-in duration-500 cursor-pointer">
                                <Link to='https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-tonmoy-free' target="_blank"><img className='w-7' src={gitLogo} alt="" /></Link>
                            </div>
                            <div
                                className="bg-main_color rounded-full flex items-center justify-center w-11 h-11 hover:bg-secondary ease-in duration-500 cursor-pointer">
                                <Link to='https://www.youtube.com/' target="_blank"><img className='w-7' src={youtubeLogo} alt="" /></Link>
                            </div>
                        </div>
                    </div>
                    {/* footer Right part */}
                    <div className="flex-1 pt-5 md:pt-0 hidden md:block">
                        <p className="text-xl pt-20 ">
                            ArtiLeaf is a platform for exploring and preserving the world’s most fascinating historical artifacts. Browse, share, and celebrate history together. Discover and contribute to history with ArtiLeaf — your digital archive for artifacts like the Rosetta Stone, the Antikythera Mechanism, and many more. Like, track, and share the wonders of the past. At ArtiLeaf, we aim to connect people through the power of history. Track legendary artifacts, add your discoveries, and explore the stories that shaped civilization.
                        </p>
                    </div>

                </div>

                <div className='text-white text-center pt-5 pb-5'>
                    <p>2025 @   <Link className=" text-xl font-semibold cursor-pointer text-white"><span className='text-white'>Arti</span>Leaf</Link>      all right reserved.</p>
                </div>
                <div>


                </div>
            </div>
        </div>
    );
};

export default Footer;