import React, { useContext, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const MyArtifactsDetails = ({ artifacts, index, setMyArtifacts, myArtifacts, pageTitle }) => {

    const { user, logOut } = useContext(AuthContext);
    const accessToken = user.accessToken;
    const navigate = useNavigate();
    // console.log(accessToken)

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | My Artifacts Details'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const { _id, name, type, historicalContext, description, createdAt, discoveredAt, discoveredBy, presentLocation, adderName, image, likedBy, adderEmail } = artifacts;

    const handlePlantDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://artileaf-server.vercel.app/artifacts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            if (res.status === 401 || res.status === 403) {
                                logOut()
                                Swal.fire({
                                    title: "Not Deleted!",
                                    text: "You Are not the Owner,if you are the owner please login again.",
                                    icon: "warning"
                                });
                            }
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Artifect deleted successfully.",
                                icon: "success"
                            });
                            //remove the artifact from the state
                            const remainingArtifacts = myArtifacts.filter(artifact => artifact._id !== id);
                            setMyArtifacts(remainingArtifacts);
                            navigate('/allArtifacts')

                        }

                    })

            }
        });
    }
    return (
        <tr className='dark:border-b-secondary'>
            <th>
                <p className='dark:text-white'>{index + 1}</p>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={image}
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold dark:text-white">{name}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                </div>
            </td>
            <td>
                <p className='dark:text-white'>{type}</p>
            </td>
            <td>
                <p className='dark:text-white'>{historicalContext}</p>
            </td>
            <td ><p className='dark:text-white'>{createdAt}</p></td>
            <td><p className='dark:text-white'>{discoveredAt}</p></td>
            <th>
                <div className='flex justify-center items-center gap-1 '>
                    <Link to={`/updateMyArtifact/${_id}`}>
                        <button className="px-2 py-2 text-lg text-primary cursor-pointer shadow-sm hover:text-white hover:bg-secondary rounded-sm dark:text-white">
                            <MdEdit />
                        </button>
                    </Link>
                    <button onClick={() => handlePlantDelete(_id)} className="px-2 py-2 text-lg text-primary cursor-pointer shadow-sm hover:text-white hover:bg-secondary rounded-sm dark:text-white">
                        <RiDeleteBin6Fill />
                    </button>
                </div>
            </th>
        </tr>
    );
};

export default MyArtifactsDetails;