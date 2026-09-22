import useRole from "../../../Hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashBoardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-ring loading-xl "></span>
            </div>
        );
    }
    if (role === "admin") {
        return <AdminDashboardHome></AdminDashboardHome>;
    } else if (role === "rider") {
        return <RiderDashboardHome></RiderDashboardHome>;
    } else {
        return <UserDashboardHome></UserDashboardHome>;
    }
};

export default DashBoardHome;
