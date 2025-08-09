import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BiDislike, BiLike } from "react-icons/bi";
import { Link } from 'react-router';
import { AuthContext } from '../../../provider/AuthProvider';
import { Tooltip } from 'react-tooltip';

const FeaturedArtifactCard = ({ artifact }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, image, description, likedBy, createdAt } = artifact;
    const [liked, setLiked] = useState(likedBy?.includes(user?.email));
    const [likeCount, setLikeCount] = useState(likedBy?.length);
    // console.log('likedBy',likedBy)


    //First reload a jate like state thake
    useEffect(() => {
        if (artifact && likedBy && user?.email) {
            const isLiked = likedBy.includes(user.email);
            setLiked(isLiked);
        }
    }, [artifact, user]);

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
        <div className="card bg-base-100 dark:bg-primary  md:w-96 w-full shadow-sm border border-gray-200 hover:border-primary dark:border-primary dark:hover:border-secondary  mt-8 ">
            <figure className="px-7 py-1 pt-10">
                <img
                    src={image}
                    alt="plant"
                    className="rounded-xl w-full" />
            </figure>
            <div className="card-body items-center ">
                <h2 className="card-title dark:text-white text-center">{name}</h2>
                <p className='dark:text-white text-center'>
                    {description.length > 100
                        ? description.slice(0, 100) + "..."
                        : description}
                </p>
                <p className='dark:text-white text-center'>Created At : {createdAt}</p>
                <p className='dark:text-white text-center'>Liked : {likeCount}</p>

            </div>
            <div className='flex justify-around items-center pb-5'>

                {
                    user ? (<>
                        <div>
                            {/* <button className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary rounded-lg"><span className='text-xl'><BiLike /></span>{likedBy.length}</button> */}
                            <a data-tooltip-id="my-tooltip" data-tooltip-content={liked ? 'DisLiked' : 'Liked'}>
                                {/* <button onClick={() => handleLike(user?.email)} className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary rounded-lg"><span className='text-xl'>{liked ? <BiDislike /> : <BiLike />}</span></button> */}
                                <button onClick={() => handleLike(user?.email)} className={liked ? "btn btn-outline bg-primary btn-primary  text-white dark:bg-secondary   dark:text-white dark:border-white rounded-lg"
                                    :
                                    "btn btn-outline btn-primary dark:hover:bg-secondary  dark:text-white dark:border-white rounded-lg"}><span className='text-xl'>{liked ? <BiDislike /> : <BiLike />}</span></button>
                            </a>
                            <Tooltip id="my-tooltip" />
                        </div>
                        <div className="card-actions">
                            <Link to={`/artifactDetails/${_id}`}>
                                <button className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-white rounded-lg">View Details</button>
                            </Link>
                        </div>
                    </>) :
                        (<div className="card-actions">
                            <Link to={`/artifactDetails/${_id}`}>
                                <button className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-white rounded-lg">View Details</button>
                            </Link>
                        </div>)
                }


                {/* <div className="card-actions">
                    <Link to={`/artifactDetails/${_id}`}>
                        <button className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-white rounded-lg">View Details</button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default FeaturedArtifactCard;