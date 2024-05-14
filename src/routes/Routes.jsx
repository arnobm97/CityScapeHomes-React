import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import UpdateProfile from "../pages/UpdateProfile";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import EstateDetails from "../pages/EstateDetails";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path : '/',
        element :<Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
        children :[
            {
                path: '/',
                element :<Home></Home>
            },
            {
                path: "/updateprofile",
                element :<PrivateRoutes> <UpdateProfile></UpdateProfile></PrivateRoutes>
            },
          
            {
                path: "/contact",
                element :<PrivateRoutes><Contact></Contact></PrivateRoutes> 
            },
            {
                path: "/registration",
                element : <Registration></Registration>
            },

            {   
                path: "/login",
                element : <Login></Login>
            },
       
            {
                path:"/estate/:id",
                element :<PrivateRoutes><EstateDetails></EstateDetails></PrivateRoutes>,
                loader : () => fetch('../estate.json')
            },
        ]
    }
]);
 export default router;