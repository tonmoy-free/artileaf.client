import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import pimage from "../../assets/icon/profile.png"

import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const EditProfile = ({pageTitle}) => {
    const { user, upProfile } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [photoUrlError, setPhotoUrlError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Edit Profile'; // default pageTitle ArtiLeaf
    }, [pageTitle]);


    useEffect(() => {

    }, [nameError, upProfile, success, user?.displayName, Swal]);


    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;

        if (name == "") {
            setNameError("***Name input field cannot be null.***");
            return;
        }
        if (photoUrl == "") {
            setPhotoUrlError("***Photo URL input field cannot be null.***");
            return;
        }



        upProfile(name, photoUrl)
            .then(() => {
                setNameError("");
                setPhotoUrlError("");
                console.log("Profile updated");
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className='px-8 md:px-0 lg:px-0 min-h-[calc(100vh_-_200px)] flex justify-center items-center mb-20 mt-8'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-primary">
                <div className="card-body">
                    <h2 className='text-center font-bold text-2xl text-primary dark:text-secondary'>Update Profile</h2>
                    <div className='flex justify-center items-center '>
                        <div className='flex justify-center items-center border-3 border-secondary rounded-full h-30 w-30 p-1 overflow-hidden ' >

                            <img className='w-full rounded-full' src={user?.photoURL ? user?.photoURL : pimage} alt="" />
                        </div>
                    </div>


                    <h2 className='text-center font-bold text-xl text-primary dark:text-secondary'>{user.displayName}</h2>
                    <form onSubmit={handleUpdateProfile} className="fieldset">
                        {/* Full Name */}
                        <label className="label dark:text-secondary">Change Name</label>
                        <input type="text" name='name' className="input dark:hover:border-secondary" placeholder="Name" defaultValue={user?.displayName} />
                        {
                            nameError && <p className="text-red-600">{nameError}</p>
                        }

                        {/* Photo URL */}
                        <label className="label dark:text-secondary">Change Photo URL</label>
                        <input type="text" name='photoUrl' className="input dark:hover:border-secondary" placeholder="Photo url" defaultValue={user?.photoURL} />
                        {
                            photoUrlError && <p className="text-red-600">{photoUrlError}</p>
                        }


                        <button type='submit' className="btn btn-outline  btn-primary hover:bg-secondary hover:border-secondary mt-4 dark:text-white dark:border-secondary">Update Profile</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;