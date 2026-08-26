import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen"> 
                <span className="loading loading-ring loading-xl "></span>
            </div>
        );
    }
    if(!user){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoutes;
