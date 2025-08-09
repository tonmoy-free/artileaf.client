import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const Register = ({ pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Register'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const { createUser, upProfileRegistration, user, loading, setUser } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [photoUrlError, setPhotoUrlError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [success, setSuccess] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) {
            navigate("/");
        }
    }, [user, navigate, loading]);



    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setNameError("");
        setPhotoUrlError("");
        setSuccess("");
        setEmailError("");
        setPasswordError("");

        // console.log(name ,email,password,confirmPassword)

        let hasError = false;

        if (name == "") {
            setNameError("***Name input field cannot be null.***");
            hasError = true;
        }
        if (photoUrl == "") {
            setPhotoUrlError("***Photo URL input field cannot be null.***");
            hasError = true;
        }
        if (email == "") {
            setEmailError("***Email input field cannot be null.***");
            hasError = true;
        }
        if (password == "") {
            setPasswordError("***Password input field cannot be null.***");
            hasError = true;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError("***Password must contain at least one uppercase letter.***");
            hasError = true;
        } else if (!/[a-z]/.test(password)) {
            setPasswordError("***Password must contain at least one lowercase letter.***");
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError("***Password must be 6 or more characters.***");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const userCredential = createUser(email, password)
            .then(result => {
                console.log(result.user)
                const user = result.user;

                // toast("Registration Successful.")
                upProfileRegistration(user, name, photoUrl);
                setUser({ ...user, displayName: name, photoURL: photoUrl });

                const userProfile = {
                    email,
                    name,
                    photoUrl,
                    creationTime: result.user?.metadata?.creationTime,
                    lastSignInTime: result.user?.metadata?.lastSignInTime
                }

                //save user info in db
                fetch(`https://artileaf-server.vercel.app/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Registration Successful.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(`${location.state ? location.state : "/"}`);
                    })

            })
            .catch(error => {
                console.log(error)
            });



    }
    return (
        // <div className=' min-h-[calc(100vh_-_200px)] flex justify-center items-center'>
        <div className='px-8 md:px-0 lg:px-0 min-h-screen flex justify-center items-center'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-primary">
                <div className="card-body">


                    <h2 className='text-center font-bold text-2xl text-primary mt-5 dark:text-secondary'>Create an account</h2>
                    <form onSubmit={handleRegister} className="fieldset">
                        {/* Full Name */}
                        <label className="label dark:text-white">Name</label>
                        <input type="text" name='name' className="input" placeholder="First Name" />
                        {
                            nameError && <p className="text-red-600">{nameError}</p>
                        }

                        {/* Photo URL */}
                        <label className="label dark:text-white">Photo URL</label>
                        <input type="text" name='photoUrl' className="input" placeholder="Photo url" />
                        {
                            photoUrlError && <p className="text-red-600">{photoUrlError}</p>
                        }

                        {/* email */}
                        <label className="label dark:text-white">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        {
                            emailError && <p className="text-red-600">{emailError}</p>
                        }

                        {/* password */}
                        <label className="label dark:text-white">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        {
                            passwordError && <p className="text-red-600">{passwordError}</p>
                        }

                        {/* ConfirmPassword */}
                        {/* <label className="label">Confirm Password</label>
                        <input type="password" name='confirmPassword' className="input" placeholder="Confirm Password" /> */}

                        <button type='submit' className="btn btn-outline  btn-primary hover:bg-secondary hover:border-secondary mt-4 dark:text-white dark:border-secondary">Create an account</button>
                    </form>
                    <p className='text-center mt-5 mb-2 dark:text-white'>Already have an account ? <Link className='hover:underline hover:font-bold text-secondary' to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;