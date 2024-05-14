import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
    const { user, logOut,loading } = useContext(AuthContext);
    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span> 
     } 

    const handleSignOut = () => {
        logOut()
            .then(() => console.log("Logged out successfully"))
            .catch(error => console.error("Logout error:", error));
    };

    const renderUserProfile = () => {
        if (user) {
            return (
                <div className="tooltip-container">
                    {user?.photoURL ? (
                        <img src={user?.photoURL} alt="User Avatar" className="w-10 h-10 mr-3 rounded-full cursor-pointer" title={user?.displayName} />
                    ) : (
                        <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-300 flex items-center justify-center text-gray-500">
                            {user.displayName.charAt(0)}
                        </div>
                    )}
                    <span className="tooltip">{user.displayName}</span>
                </div>
            );
        }
        return null;
    };
    

    const renderAuthButtons = () => {
        if (user) {
            return (
                <div onClick={handleSignOut} className="btn mr-2">Sign Out</div>
            );
        } else {
            return (
                <Link to="/login">
                    <div className="btn mr-4">Log In</div>
                </Link>
            );
        }
    };

    return (
        <div>
            <div className="navbar nav-col text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content text-black mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className='mr-4'><NavLink to="/" activeClassName="active">Home</NavLink></li>
                            <li className='mr-4 '><NavLink to="/updateprofile" activeClassName="active">Update Profile</NavLink></li>
                            <li className='mr-4 '><NavLink to="/registration" activeClassName="active">Registration</NavLink></li>
                            <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
                        </ul>
                    </div>
                    <Link className="btn btn-ghost text-xl">CityScapeHomes</Link>
                </div>
                <div className="navbar-center hidden  lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className='mr-4'><NavLink to="/" activeClassName="active">Home</NavLink></li>
                        <li className='mr-4 '><NavLink to="/updateprofile" activeClassName="active">Update Profile</NavLink></li>
                        <li className='mr-4 '><NavLink to="/registration" activeClassName="active">Registration</NavLink></li>
                        <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {renderUserProfile()} 
                    {renderAuthButtons()}
                </div>
            </div>
        </div>
    );
};

export default Navbar;