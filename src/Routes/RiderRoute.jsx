import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const RiderRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if ((loading, roleLoading)) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-ring loading-xl "></span>
            </div>
        );
    }
    if (role !== "rider") {
        return (
            <div className="flex justify-center items-center h-full">
                <h1>You are Forbidden to Access this Page</h1>
            </div>
        );
    }
    return children;
};

export default RiderRoute;