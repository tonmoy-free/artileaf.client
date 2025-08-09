import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

// const formatTime12Hour = (date) => {
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");
//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;

//     return `${hours}:${minutes}:${seconds} ${ampm}`;
// };


const AddArtifacts = ({ pageTitle }) => {
    const { user, logOut } = useContext(AuthContext);
    const accessToken = user.accessToken;
    const createdDate = new Date();

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Add Artifacts'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const handleArtifact = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const artifactData = Object.fromEntries(formData.entries());
        const adderEmail = user.email;
        const adderName = user?.displayName;
        const formattedCreatedDate = createdDate.toLocaleDateString("en-GB").replace(/\//g, '-');
        const likedBy = [];


        const finalArtifactData = {
            adderEmail,
            adderName,
            ...artifactData,
            likedBy,
            createdDate: formattedCreatedDate
        }

        // console.log(finalArtifactData)
        fetch(`https://artileaf-server.vercel.app/artifacts`, {
            method: 'POST',
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
                            title: "Not Added!",
                            text: "You Are not the Owner,if you are the owner please login again.",
                            icon: "warning"
                        });
                    }
                }
                return res.json();
            })
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Add Artifacts Successful.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })


    }
    return (
        <div className='w-11/12 mx-auto pb-15'>
            <div className='p-12 text-center space-y-4'>
                <h1 className="text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary">Add Artifact</h1>
                <p className='text-gray-600 dark:text-white'>Contribute to the legacy of human civilization. Share unique artifacts you’ve discovered or researched and help others explore the untold stories of the past.</p>
            </div>
            <form onSubmit={handleArtifact}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Artifact Name</label>
                        <input type="text" name='name' className="input w-full" placeholder="Artifact Name" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Historical Context</label>
                        <input type="text" name='historicalContext' className="input w-full" placeholder="Historical Context" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Created At</label>
                        <input type="text" name='createdAt' className="input w-full" placeholder="Created At" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Discovered At</label>
                        <input type="text" name='discoveredAt' className="input w-full" placeholder="Discovered At" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Discovered By</label>
                        <input type="text" name='discoveredBy' className="input w-full" placeholder="Discovered By" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Present Location</label>
                        <input type="text" name='presentLocation' className="input w-full" placeholder="Present Location" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Artifact Type</label>
                        <select className="input input-bordered w-full" name="type" defaultValue='Select Artifact Type' required>
                            <option disabled >Select Artifact Type</option>
                            <option value="Tools">Tools</option>
                            <option value="Weapons">Weapons</option>
                            <option value="Documents">Documents</option>
                            <option value="Writings">Writings</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Short Description</label>
                        <input type="text" name='description' className="input w-full" placeholder="Short Description" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border my-6 p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Adder Name</label>
                        <input type="text" name='adderName' className="input w-full" placeholder="Adder Name" required defaultValue={user?.displayName} disabled />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border my-6 p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                        <label className="label dark:text-white">Adder Email</label>
                        <input type="text" name='adderEmail' className="input w-full" placeholder="Adder Email" required defaultValue={user?.email} disabled />
                    </fieldset>

                </div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border my-6 p-4 dark:bg-primary dark:border-primary dark:hover:border-secondary">
                    <label className="label dark:text-white">Artifact Image</label>
                    <input type="text" name='image' className="input w-full" placeholder="Artifact Image URL" required />
                </fieldset>



                <input type="submit" className='btn w-full btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary' value="Add Artifact" />
            </form>
        </div>
    );
};

export default AddArtifacts;