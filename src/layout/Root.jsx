import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
    return (
        <div className="roboto-regular  lg:mx-auto my-auto">
            <Navbar></Navbar>
            <ToastContainer></ToastContainer>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;