import { Link, useLocation, useNavigate } from "react-router-dom";
import UseTitle from "../components/UseTitle";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from './../firebase/firebase.config';
import { GithubAuthProvider, getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    UseTitle("Login")
    const auth = getAuth(app);
    const location = useLocation();
    const googleprovider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const navigate = useNavigate();
    
    const {signIn} = useContext(AuthContext)
    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const password = form.get("password");
        const email = form.get("email");
    
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                toast.success("Successfully Logged In");
                navigate(location?.state ?location.state :'/');
            })
            .catch(error => {
                console.error(error);
                toast.error("Invalid email or password. Please try again.");
            });
    };
    const handleGoogleSignin =() =>{
        signInWithPopup(auth,googleprovider)
        .then(result =>{
           const user = result.user;
           console.log(user);
           toast.success("Successfully Logged In");
           navigate(location?.state ?location.state :'/')
        })
        .catch(error =>{
            console.log('error',error.message);
            toast.error("Invalid email or password. Please try again.");
        })
    }
    const handleGithubSignin =() =>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
           const user = result.user;
           console.log(user);
           toast.success("Successfully Logged In");
           navigate(location?.state ?location.state :'/')
        })
        .catch(error =>{
            console.log('error',error.message);
            toast.error("Invalid email or password. Please try again.");
        })
    }
    return (
        <div className="mb-16" >
            <h1 className='font-bold text-4xl text-center mb-6 mt-20'>Please Login</h1>
            <div className="text-center mb-4">
            <button className="btn btn-ghost " onClick={handleGoogleSignin}>Google Login</button>
            <button className="btn btn-ghost " onClick={handleGithubSignin}>Github Login</button>
            </div>
           <form className="bg-base-200 lg:w-[600px]  rounded-2xl p-10 mx-auto" onSubmit={handleLogin}>  
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" className="input input-bordered" required name="email" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password" className="input input-bordered" required name="password"/>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Log in
                    </button>   
                </div>
            </form>
            <p className="text-center mt-6">Do not have an account? <Link to="/registration" className="text-blue-600 font-bold  ">Register Here</Link></p>
        </div>
    );
};

export default Login;