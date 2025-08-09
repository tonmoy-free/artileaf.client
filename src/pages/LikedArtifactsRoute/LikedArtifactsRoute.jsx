import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import FeaturedArtifactCard from '../../components/Home/FeaturedArtifacts/FeaturedArtifactCard';
import Swal from 'sweetalert2';

const LikedArtifactsRoute = ({ pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Liked Artifacts'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const { user, logOut, setLoading } = useContext(AuthContext);
    const [likedArtifacts, setLikedArtifacts] = useState([]);
    const accessToken = user.accessToken;
    console.log(accessToken)
    useEffect(() => {
        // setLoading(true)
        const likePromise = fetch(`https://artileaf-server.vercel.app/likedArtifacts/${user?.email}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        logOut()
                        Swal.fire({
                            title: "OOPS!",
                            text: "You Are not the Owner,if you are the owner please login again.",
                            icon: "warning"
                        });
                    }
                }
                return res.json()
            })
            .then(data => {
                setLikedArtifacts(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }, [user, likedArtifacts])

    if (likedArtifacts.length === 0) {
        return (
            <div className="text-center p-10 w-11/12 min-h-[calc(100vh-400px)] flex justify-center items-center">
                <h2 className="text-xl text-gray-600 dark:text-white"> আপনি এখনো কোনো আর্টিফ্যাক্ট লাইক করেননি।</h2>
            </div>
        );
    }

    return (
        <div className='w-11/12 mx-auto md:px-0 px-2 mb-15'>
            <div className='mt-18 lg:mt-20 md:mt-20'>
                <h1 className='text-center text-2xl md:text-5xl font-bold text-primary mb-4 dark:text-secondary'>Liked Artifacts</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-8 dark:text-white'>
                    Explore the historical artifacts you've interacted with and admired.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]'>
                {
                    likedArtifacts.map(artifact =>
                        <FeaturedArtifactCard
                            key={artifact._id}
                            artifact={artifact}>
                        </FeaturedArtifactCard>)
                }
            </div>
        </div >
    );
};

export default LikedArtifactsRoute;