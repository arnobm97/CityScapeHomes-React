
import { useContext, useState } from "react";
import UseTitle from "../components/UseTitle";
import { Link, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import { AuthContext } from "../providers/AuthProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
    UseTitle("Registration");
    const [showPassword, setShowPassword] = useState(false);
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
    
        const name = form.get("name");
        const photo = form.get("photo"); 
        const password = form.get("password");
        const email = form.get("email");
    
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const minLength = 6;
    
        if (!uppercaseRegex.test(password)) {
            toast.error("Password must contain at least one uppercase letter");
            return;
        }
    
        if (!lowercaseRegex.test(password)) {
            toast.error("Password must contain at least one lowercase letter");
            return;
        }
    
        if (password.length < minLength) {
            toast.error(`Password must be at least ${minLength} characters long`);
            return;
        }
    
        try {
            await createUser(email, password, name, photo); 
            toast.success("Successfully Registered");
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    };
    
        

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="mb-24">
            <h1 className='font-bold text-4xl text-center mb-6 mt-20'>Please Register</h1>
            <form className="bg-base-200 lg:w-[600px] rounded-2xl p-10 mx-auto" onSubmit={handleRegister}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered" required name="name" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">PhotoUrl</span>
                    </label>
                    <input type="text" placeholder="Photo Url" className="input input-bordered" required name="photo" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" className="input input-bordered" required name="email" />
                </div>
                <div className="form-control relative"> 
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? "text" : "password"} placeholder="Password" className="input input-bordered pr-10" required name="password" /> 
                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none">
                        {showPassword ? (
                            <i className="fas fa-eye"></i>
                        ) : (
                            <i className="fas fa-eye-slash"></i>
                        )}
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Register
                    </button>
                </div>
            </form>
            <p className="text-center mt-6">Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login Here</Link></p>
        </div>
    );
};

export default Registration;
