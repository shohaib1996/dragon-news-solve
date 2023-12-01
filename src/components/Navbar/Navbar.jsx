import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Log Out successfully')
            })
            .catch(error => {
                console.error(error);
            })
    }
    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-[#403F3F] text-white p-2  rounded-md" : ""
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/about"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-[#403F3F] text-white p-2 rounded-md" : ""
                }
            >
                About
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/career"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-[#403F3F] text-white p-2 rounded-md" : ""
                }
            >
                Career
            </NavLink>
        </li>

    </>
    return (
        <div className="navbar bg-base-100 max-w-screen-xl mx-auto mt-3">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}

                    </ul>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="space-x-5 menu-horizontal px-1 text-[#706F6F]">
                    {links}

                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <p className="bg-black px-2 mr-3 rounded-md text-white font-bold">{user.email || user.displayName || "Anonymous" }</p> : ""
                }
                {
                    user ? <img className="w-12 h-12 mr-5 rounded-full" src={user.photoURL} alt="" /> : <img className="w-12 h-12 mr-5" src="/assets/user.png" alt="" />
                }
                {
                    user ? <button onClick={handleLogOut} className="btn bg-[#403F3F] text-white">Sign Out</button> :
                        <Link to="/login"><button className="btn bg-[#403F3F] text-white">login</button></Link>
                }

            </div>
        </div>
    );
};

export default Navbar;