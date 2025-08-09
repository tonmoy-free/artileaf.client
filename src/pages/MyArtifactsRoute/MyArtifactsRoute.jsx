import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Loading from '../../components/Loading/Loading';
import MyArtifactsDetails from './MyArtifactsDetails';


const MyArtifactsRoute = ({ pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | My Artifacts'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const [isLoading, setIsLoading] = useState(true);
    const { user, logOut,setLoading } = useContext(AuthContext);
    const [myArtifacts, setMyArtifacts] = useState([]);
    const accessToken = user.accessToken;
    useEffect(() => {
        setIsLoading(true);
        const myArtifactPromise = fetch(`https://artileaf-server.vercel.app/myArtifacts/${user?.email}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        logOut()
                        // alert('LogOut user For 401 Status Code')
                    }
                }
                return res.json()
            })
            .then(data => {
                setMyArtifacts(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
            });
    }, [user])

    if (myArtifacts.length === 0) {
        return (
            <div className="text-center p-10 w-11/12 min-h-[calc(100vh-400px)] flex justify-center items-center">
                <h2 className="text-xl text-gray-600 dark:text-white"> আপনি এখনো কোনো আর্টিফ্যাক্ট Add/যোগ করেননি।</h2>
            </div>
        );
    }
    return (
        <div className='w-11/12 mx-auto mt-6 mb-15'>
            <div className='mt-18 lg:mt-20 md:mt-20'>
                <h1 className='text-center text-2xl md:text-5xl font-bold text-primary mb-4 dark:text-secondary'>My Artifacts</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-8 dark:text-white'>
                    These are the historical pieces you've shared with the community.
                </p>
            </div>
            <div className='mt-2 mb-2'>
                <p className='text-primary font-semibold hover:text-secondary cursor-pointer dark:text-secondary'>Total Artifacts : {myArtifacts.length}</p>
            </div>

            <div className="overflow-x-auto shadow-sm rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead className='bg-primary text-white dark:bg-secondary'>
                        <tr>
                            <th>NO</th>
                            <th>Artifact Name</th>
                            <th>Artifact Type</th>
                            <th>Historical Context</th>
                            <th>Created At</th>
                            <th>Discovered At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {isLoading
                            ?
                            <Loading></Loading>
                            :
                            myArtifacts.length > 0
                                ?
                                (
                                    myArtifacts?.map((artifacts, index) =>
                                        <MyArtifactsDetails
                                            key={index}
                                            index={index}
                                            artifacts={artifacts}
                                            setMyArtifacts={setMyArtifacts}
                                            myArtifacts={myArtifacts}
                                        >
                                        </MyArtifactsDetails>
                                    )
                                )
                                :
                                <p>Not Found</p>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyArtifactsRoute;