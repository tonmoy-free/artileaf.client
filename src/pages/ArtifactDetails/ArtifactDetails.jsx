import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { BiDislike, BiLike } from 'react-icons/bi';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import Loading from '../../components/Loading/Loading';

const ArtifactDetails = ({ pageTitle }) => {
    // const data = useLoaderData();
    const { id } = useParams();
    //  console.log(id)
    const [data, setData] = useState([]);
    const { user, setLoading, loading } = useContext(AuthContext);
    const { _id, name, type, historicalContext, description, createdAt, discoveredAt, discoveredBy, presentLocation, adderName, image, likedBy, adderEmail } = data || {};
    // const [liked, setLiked] = useState(likedBy?.includes(user?.email));
    const [liked, setLiked] = useState();
    // const [likeCount, setLikeCount] = useState(likedBy?.length);
    const [likeCount, setLikeCount] = useState();
    // console.log("is liked : ", liked)
    // console.log(likeCount)
    const accessToken = user.accessToken;

    useEffect(() => {
        if (likedBy) {
            setLikeCount(likedBy.length);
            setLiked(likedBy?.includes(user?.email));
        }
    }, [likedBy]);

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Artifact Details'; // default pageTitle ArtiLeaf
    }, [pageTitle]);



    useEffect(() => {
        // setLoading(true)
        const likePromise = fetch(`https://artileaf-server.vercel.app/artifacts/${id}`, {
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
                setData(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }, [user, data])


    //handle like/dislike
    const handleLike = () => {
        // if (user?.email === adderEmail) return alert('you cant like your own submission')
        //handle like toggle api fetch
        axios
            .patch(`https://artileaf-server.vercel.app/like/${_id}`, {
                email: user?.email
            }
            )
            .then(data => {
                console.log(data?.data)
                const isLiked = data?.data?.liked
                // update liked state
                setLiked(isLiked)

                // update likeCount State
                setLikeCount(prev => (isLiked ? prev + 1 : prev - 1))
            })
            .catch(err => {
                console.log(err)
            })
    }

    

    return (
        <div className='w-10/12 mx-auto '>
            <div className="rounded-lg bg-base-100 mt-10 mb-10  shadow-sm flex md:flex-row flex-col  justify-center items-center  p-5 gap-5 md:gap-10 dark:bg-gray-600">
                <figure className='flex-1/2 h-full w-full md:h-[430px]  rounded-lg flex justify-center items-center'>
                    <img
                        className=' h-full  bg-cover bg-center bg-no-repeat rounded-lg'
                        src={image}
                        alt="" />
                </figure>
                <div className=" pt-0 flex-1/2 space-y-4">
                    <div className='space-y-4'>
                        <h2 className="card-title text-primary font-bold uppercase text-3xl dark:text-secondary">
                            {name}
                        </h2>
                        <p className='text-gray-600 font-medium dark:text-white'>{description}</p>
                        <p className='text-[15px] font-medium dark:text-secondary'>Type : {type}</p>
                        <p className='text-[15px] font-medium dark:text-secondary'>Historical Context : {historicalContext}</p>
                        <div className='space-y-1'>
                            <p className='text-[15px] font-medium text-gray-700 dark:text-white'>Created At : {createdAt}</p>
                            <p className='text-[15px] font-medium text-gray-700 dark:text-white'>Discovered At : {discoveredAt}</p>
                        </div>
                        <div className="card-actions flex-col justify-start">
                            <div className="px-[10px] py-[4px] text-[12px] bg-primary rounded-xl text-white dark:bg-secondary">Discovered By : {discoveredBy}</div>
                            <div className="px-[10px] py-[4px] text-[12px] bg-primary rounded-xl text-white dark:bg-secondary">Present Location : {presentLocation}</div>
                            <div className="px-[10px] py-[4px] text-[12px] bg-primary rounded-xl text-white dark:bg-secondary">Like : {likeCount}</div>
                            <a data-tooltip-id="my-tooltip" data-tooltip-content={liked ? 'DisLiked' : 'Liked'}>
                                {/* <button onClick={() => handleLike(user?.email)} className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary rounded-lg"><span className='text-xl'>{liked ? <BiDislike /> : <BiLike />}</span></button> */}
                                <button onClick={() => handleLike(user?.email)} className={liked ? "btn btn-outline bg-primary btn-primary  text-white dark:bg-secondary   dark:text-white dark:border-white rounded-lg"
                                    :
                                    "btn btn-outline btn-primary dark:hover:bg-secondary  dark:text-white dark:border-white rounded-lg"}><span className='text-xl'>{liked ? <BiDislike /> : <BiLike />}</span></button>
                            </a>
                            <Tooltip id="my-tooltip" />
                        </div>
                    </div>
                    <div className=''>
                        <p className="text-[11px] text-primary dark:text-white">Added By : {adderName}</p>
                        <p className="text-[11px] text-primary dark:text-white">Adder Email : {adderEmail}</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ArtifactDetails;