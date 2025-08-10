import React, { Suspense, useContext, useEffect, useState } from 'react';
import FeaturedArtifactCard from '../../components/Home/FeaturedArtifacts/FeaturedArtifactCard';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../provider/AuthProvider';

const AllArtifacts = ({ pageTitle }) => {
    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | All Artifacts';
    }, [pageTitle]);

    const { setLoading } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // asc or desc
    const [artifactsData, setArtifactsData] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`https://artileaf-server.vercel.app/artifacts?searchParams=${search}&sortOrder=${sortOrder}`)
            .then(res => res.json())
            .then(data => {
                setArtifactsData(data);
                setLoading(false);
            });
    }, [search, sortOrder]);

    return (
        <div className='w-11/12 mx-auto md:px-0 px-2 mb-15'>
            <div className='mt-18 lg:mt-20 md:mt-20'>
                <h1 className='text-center text-2xl md:text-5xl font-bold text-primary mb-4 dark:text-secondary'>
                    All Artifacts
                </h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-8 dark:text-white'>
                    Uncover the stories behind all recorded historical artifacts in one place. <br />
                    Browse through our complete collection of artifacts from across civilizations and centuries.
                </p>

                {/* Search + Sort */}
                <div className='flex flex-col md:flex-row justify-center gap-4 mb-6'>
                    <input
                        type="text"
                        name='search'
                        placeholder='Search By Artifact Name'
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-6/12 px-4 py-2 border border-gray-300 rounded-md  dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <select
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm
                        dark:bg-black"
                    >
                        <option value="">Sort by Likes</option>
                        <option value="asc">Ascending Likes</option>
                        <option value="desc">Descending Likes</option>
                    </select>
                </div>
            </div>

            <Suspense fallback={<Loading />}>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]'>
                    {artifactsData.map(artifact => (
                        <FeaturedArtifactCard key={artifact._id} artifact={artifact} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
};

export default AllArtifacts;
