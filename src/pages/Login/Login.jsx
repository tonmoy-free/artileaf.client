import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import goolgeIcon from "../../assets/icon/google.png";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';


const Login = ({pageTitle}) => {

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Login'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const { signIn, setUser, user, loading, setLoading, gSignIN } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailPasswordError, setEmailPasswordError] = useState("");



    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        setEmailError("");
        setPasswordError("");

        let hasError = false;
        if (email == "") {
            setEmailError("***Email input field cannot be null.***");
            hasError = true;
        }
        if (password == "") {
            setPasswordError("***Password input field cannot be null.***");
            hasError = true;
        }

        if (hasError) {
            return;
        }
        // console.log(email, password)
        signIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                // alert("wkj")
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(`${location.state ? location.state : "/"}`);
                // alert("login successfully");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // alert(errorCode, errorMessage);

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email or Password is wrong.",
                });
                setLoading(false);
            });

    }

    const handleGSingnIn = () => {
        gSignIN()
            .then((result) => {
                // const user = result.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`${location.state ? location.state : "/"}`);
                setLoading(false);
                // alert("login successfully");
            }).catch((error) => {

                //  const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something is wrong.try with another account.",
                });
                setLoading(false);


            });

    }


    return (
        <div className='px-8 md:px-0 lg:px-0 min-h-screen flex justify-center items-center'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-primary">
                <div className="card-body">


                    <h2 className='text-center font-bold text-2xl text-primary mt-5 dark:text-secondary'>Login To Your Account</h2>
                    <form onSubmit={handleLogin} className="fieldset">
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

                        <div><Link to="/login/forgotPassword" className='hover:underline hover:font-semibold text-secondary'>Forgot password?</Link></div>
                        <button className="btn btn-outline  btn-primary hover:bg-secondary hover:border-secondary mt-4 dark:text-white dark:border-secondary">Login</button>

                    </form>
                    <button type='button' onClick={handleGSingnIn} className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary">
                        <div className='flex justify-center items-center gap-2 '>
                            <img className='w-4 mt-[3px]' src={goolgeIcon} alt="" />
                            <div>Login with Google</div>
                        </div>
                    </button>


                    <p className='text-center mt-5 mb-2 dark:text-white'>Don't have an account ? <Link className='hover:underline hover:font-semibold text-secondary' to="/login/register">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;