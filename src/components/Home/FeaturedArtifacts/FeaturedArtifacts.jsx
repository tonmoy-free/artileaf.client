import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';

import FeaturedArtifactCard from './FeaturedArtifactCard';
import { AuthContext } from '../../../provider/AuthProvider';

const FeaturedArtifacts = ({ artifactsData }) => {
    const { user, logOut } = useContext(AuthContext);
    const [displayArtifacts, setDisplayArtifacts] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const accessToken = user?.accessToken;
    // console.log(' accessToken', user)
    useEffect(() => {
        setDisplayArtifacts(artifactsData.slice(0, 6));
    }, [artifactsData])

    // useEffect(() => {
    //     const likePromise = fetch(`https://artileaf-server.vercel.app/artifacts/top-liked`, {
    //         headers: {
    //             authorization: `Bearer ${accessToken}`
    //         }
    //     })
    //         .then(res => {
    //             if (!res.ok) {
    //                 if (res.status === 401 || res.status === 403) {
    //                     logOut()
    //                     // alert('LogOut user For 401 Status Code')
    //                 }
    //             }
    //             return res.json()
    //         })
    //         .then(data => {
    //             setDisplayArtifacts(data.slice(0, 6));
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    // }, [user])

    // console.log(displayArtifacts)




    return (
        <div className='w-11/12 mx-auto md:px-0 px-2'>
            <div className='mt-18 lg:mt-20 md:mt-20'>
                <h1 className='text-center text-2xl md:text-5xl font-bold text-primary mb-4 dark:text-secondary'>Featured Artifacts</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-8 dark:text-white'>
                    Based on your likes, here are the top historical <br /> wonders that stand out for their story, mystery, and beauty.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]'>
                {
                    displayArtifacts.map(artifact =>
                        <FeaturedArtifactCard
                            key={artifact._id}
                            artifact={artifact}>
                        </FeaturedArtifactCard>)
                }
            </div>
            <div className='flex justify-center mt-8 mb-9 md:mb-0'>
                <Link to='/allArtifacts'>
                    <button
                        type='submit'

                        className="hover:bg-secondary hover:border-secondary border border-primary text-primary  rounded-4xl hover:text-white font-bold text-sm md:text-xl px-7 py-2 md:py-3 cursor-pointer dark:text-white dark:border-white">See All
                    </button>
                </Link>
            </div>
        </div >
    );
};

export default FeaturedArtifacts;