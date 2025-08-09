import React, { Suspense, useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import FeaturedArtifactCard from '../../components/Home/FeaturedArtifacts/FeaturedArtifactCard';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../provider/AuthProvider';

const AllArtifacts = ({ pageTitle }) => {
    // const artifactsData = useLoaderData();
    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | All Artifacts'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const { setLoading } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [artifactsData, setArtifactsData] = useState([]);
    useEffect(() => {
        fetch(`https://artileaf-server.vercel.app/artifacts/?searchParams=${search}`)
            .then(res => res.json())
            .then(data => {
                setArtifactsData(data)
                setLoading(false)
            })
              
    }, [search])


    return (
        <div className='w-11/12 mx-auto md:px-0 px-2 mb-15 '>
            <div className='mt-18 lg:mt-20 md:mt-20'>
                <h1 className='text-center text-2xl md:text-5xl font-bold text-primary mb-4 dark:text-secondary'>All Artifacts</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-8 dark:text-white'>
                    Uncover the stories behind all recorded historical artifacts in one place. <br /> Browse through our complete collection of artifacts from across civilizations and centuries.
                </p>
                <div className='flex justify-center'>
                    <input type="text"
                        name='search'
                        placeholder='Search By Artifact Name'
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-6/12 px-4 py-2 border border-gray-300  rounded-md dark:text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                </div>
            </div>
            <Suspense fallback={<Loading></Loading>}>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]'>
                    {
                        artifactsData.map(artifact =>
                            <FeaturedArtifactCard
                                key={artifact._id}
                                artifact={artifact}>
                            </FeaturedArtifactCard>)
                    }
                </div>
            </Suspense>
        </div >
    );
};

export default AllArtifacts;