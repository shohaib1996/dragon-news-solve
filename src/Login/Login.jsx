import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";


const Login = () => {
    const { signInUser } = useContext(AuthContext)
    const [registerError, setRegisterError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const emailRef = useRef(null)
    const handleLogin = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get("email")
        const password = form.get("password")
        // const isChecked = form.get("terms")
        console.log(email, password);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setRegisterError(`please enter a valid email like
            "example@gmail.com"`)
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
        }
        // else if (!isChecked) {
        //     setRegisterError('Please Agree with terms and condition')
        //     return
        // }

        signInUser(email, password)
            .then(result => {
                console.log(result.user)
                e.target.reset()
                navigate(location?.state ? location.state : "/")
                toast.success("Login Successfully")

            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleForgetPassword = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = emailRef.current.value;
        if (!email) {
            toast.error('please Enter a email Address')
        } else if (!email.test(emailRegex)) {
            toast.error("please Enter a valid Email!!")
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
             toast.success("Check You Email Address")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }
    return (
        <main className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                            Sign in
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Don&apos;t have an account yet?
                            <Link to="/register" className="text-blue-600 decoration-2 hover:underline font-medium">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                    <div className="mt-5">
                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                            Or
                        </div>
                        {/* Form */}
                        <form onSubmit={handleLogin}>
                            <div className="grid gap-y-4">
                                {/* Form Group */}
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
                                            required=""
                                            aria-describedby="email-error"
                                        />

                                    </div>

                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm mb-2 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <a onClick={handleForgetPassword}
                                            className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                                            
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                            required=""
                                            aria-describedby="password-error"
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
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                {/* End Checkbox */}
                                <button
                                    type="submit"
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Sign in
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

export default Login;