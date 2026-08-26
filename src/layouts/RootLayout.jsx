import { Outlet } from "react-router";
import Footer from "../Pages/Utility/Footer/Footer";
import Navbar from "../Pages/Utility/Navbar/Navbar";

const RootLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;