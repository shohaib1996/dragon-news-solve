import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { updateProfile } from "firebase/auth";
import {  FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from "react-hot-toast";


const Register = () => {
    const { createUser, logOut } = useContext(AuthContext)
    const [registerError, setRegisterError] = useState('')
    const [isShow, setIsShow] = useState(false)
    const navigate = useNavigate()
    const handleRegister = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const name = form.get("name")
        const email = form.get("email")
        const password = form.get("password")
        const confirmPassword = form.get("confirmPassword")
        const photo = form.get("photo")
        const isChecked = form.get("terms")
        console.log(name, email, password, confirmPassword, photo, isChecked);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setRegisterError(`please enter a valid email like
            "example@gmail.com"`)
        } else if (password !== confirmPassword) {
            setRegisterError('Please Input Same Password');
            return
        } else if (password.length < 8) {
            setRegisterError('Password must be at least 8 characters long');
            return
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password must contain at least one uppercase letter');
            return
        } else if (!/[a-z]/.test(password)) {
            setRegisterError('Password must contain at least one lowercase letter');
            return
        } else if (!/\d/.test(password)) {
            setRegisterError('Password must contain at least one digit');
            return
        } else if (!/[!@#$%^&*]/.test(password)) {
            setRegisterError('Password must contain at least one special character (!@#$%^&*)');
            return
        } else if (!isChecked) {
            setRegisterError('Please Agree with terms and condition')
            return
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                e.target.reset()
                toast.success("User Created SuccessFully")
                toast.success("Please Login Now For Better Experience")

                updateProfile(user, {
                    displayName: name, photoURL: photo
                }).then(() => {
                    toast.success('User Profile Updated');
                    
                    logOut()
                        .then(() => {
                            console.log('Log Out successfully')
                            navigate("/login")
                        })
                        .catch(error => {
                            console.error(error);
                        })
                    
                }).catch(error => {
                    console.error(error);
                })
            })
            .catch(error => {
                console.error(error);
            })

    }
    const handleShowPassword = () => {
        setIsShow(!isShow)

    }
    return (
        <main className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                            Sign up
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?
                            <Link to="/login" className="text-blue-600 decoration-2 hover:underline font-medium">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                    <div className="mt-5">

                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                            Or
                        </div>
                        {/* Form */}
                        <form onSubmit={handleRegister}>
                            <div className="grid gap-y-4">
                                {/* Form Group */}
                                <div>
                                    <label

                                        className="block text-sm mb-2 dark:text-white"
                                    >
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                            required
                                            aria-describedby="email-error"
                                        />

                                    </div>

                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm mb-2 dark:text-white"
                                    >
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                            required
                                            aria-describedby="email-error"
                                        />

                                    </div>

                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="relative">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm mb-2 dark:text-white"
                                    >
                                        Password
                                    </label>
                                   
                                    <div className="relative">
                                        <input
                                            type= {isShow ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                            required
                                            aria-describedby="password-error"
                                        />

                                    </div>
                                    <button onClick={handleShowPassword}>
                                        {
                                            isShow ? <FaEyeSlash className="font-2xl absolute bottom-10 left-[310px]"></FaEyeSlash> : <FaEye className="font-2xl absolute bottom-10 left-[310px]"></FaEye>
                                        }
                                    </button>


                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block text-sm mb-2 dark:text-white"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="confirm-password"
                                            name="confirmPassword"
                                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                            required
                                            aria-describedby="confirm-password-error"
                                        />

                                    </div>

                                </div>
                                <div>
                                    <label

                                        className="block text-sm mb-2 dark:text-white"
                                    >
                                        Photo
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"

                                            name="photo"
                                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                            required
                                            aria-describedby="confirm-password-error"
                                        />

                                    </div>

                                </div>
                                {
                                    registerError && <span className="text-red-700 text-center">{registerError}</span>
                                }


                                {/* End Form Group */}
                                {/* Checkbox */}
                                <div className="flex items-center">
                                    <div className="flex">
                                        <input
                                            id="remember-me"
                                            name="terms"
                                            type="checkbox"
                                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label
                                            htmlFor="remember-me"
                                            className="text-sm dark:text-white"
                                        >
                                            I accept the{" "}
                                            <a
                                                className="text-blue-600 decoration-2 hover:underline font-medium"
                                                href="#"
                                            >
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                {/* End Checkbox */}
                                <button
                                    type="submit"
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;