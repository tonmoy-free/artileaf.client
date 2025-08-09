import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const UpdateMyArtifact = ({ pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Update My Artifact'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const { id } = useParams();
    const { user, logOut, setLoading } = useContext(AuthContext);
    const accessToken = user.accessToken;
    const [artifact, setArtifact] = useState();


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
                setArtifact(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }, [user, artifact])

    // const { _id, name, type, historicalContext, description, createdAt, discoveredAt, discoveredBy, presentLocation, adderName, image, likedBy, adderEmail } = useLoaderData() || {};

    const { _id, name, type, historicalContext, description, createdAt, discoveredAt, discoveredBy, presentLocation, adderName, image, likedBy, adderEmail } = artifact || {};

    const UpdatedDate = new Date();

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const artifactData = Object.fromEntries(formData.entries());
        const formattedUpdatedDate = UpdatedDate.toLocaleDateString("en-GB").replace(/\//g, '-');

        const finalArtifactData = {
            ...artifactData,
            updatedDate: formattedUpdatedDate
        }

        // console.log(finalArtifactData)
        fetch(`https://artileaf-server.vercel.app/updateMyArtifacts/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(finalArtifactData)
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        logOut()
                        Swal.fire({
                            title: "Not Updated!",
                            text: "You Are not the Owner,if you are the owner please login again.",
                            icon: "warning"
                        });
                    }
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Updated Artifact Successful.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // form.reset();
                }
            })


    }
    return (
        <div className='w-11/12 mx-auto pb-15'>
            <div className='p-12 text-center space-y-4'>
                <h1 className="text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary">Update Artifact</h1>
                <p className='text-gray-600 dark:text-white'>Contribute to the legacy of human civilization. Share unique artifacts you’ve discovered or researched and help others explore the untold stories of the past.</p>
            </div>
            <form onSubmit={handleUpdate}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Artifact Name</label>
                        <input type="text" defaultValue={name} name='name' className="input w-full" placeholder="Artifact Name" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Historical Context</label>
                        <input type="text" defaultValue={historicalContext} name='historicalContext' className="input w-full" placeholder="Historical Context" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Created At</label>
                        <input type="text" defaultValue={createdAt} name='createdAt' className="input w-full" placeholder="Created At" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Discovered At</label>
                        <input type="text" defaultValue={discoveredAt} name='discoveredAt' className="input w-full" placeholder="Discovered At" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Discovered By</label>
                        <input type="text" defaultValue={discoveredBy} name='discoveredBy' className="input w-full" placeholder="Discovered By" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Present Location</label>
                        <input type="text" defaultValue={presentLocation} name='presentLocation' className="input w-full" placeholder="Present Location" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Artifact Type</label>
                        <select className="input input-bordered w-full" name="type" defaultValue={type} required>
                            <option disabled >Select Artifact Type</option>
                            <option value="Tools">Tools</option>
                            <option value="Weapons">Weapons</option>
                            <option value="Documents">Documents</option>
                            <option value="Writings">Writings</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Short Description</label>
                        <input type="text" defaultValue={description} name='description' className="input w-full" placeholder="Short Description" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border my-6 p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Adder Name</label>
                        <input type="text" defaultValue={adderName} name='adderName' className="input w-full" placeholder="Adder Name" required disabled />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border my-6 p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Adder Email</label>
                        <input type="text" name='adderEmail' className="input w-full" placeholder="Adder Email" required defaultValue={user?.email} disabled />
                    </fieldset>

                </div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border my-6 p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                    <label className="label dark:text-white">Artifact Image</label>
                    <input type="text" defaultValue={image} name='image' className="input w-full" placeholder="Artifact Image URL" required />
                </fieldset>



                <input type="submit" className='btn w-full btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary' value="Update Artifact" />
            </form>
        </div>
    );
};

export default UpdateMyArtifact;