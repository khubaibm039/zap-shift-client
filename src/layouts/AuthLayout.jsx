import { Outlet } from "react-router";
import Logo from "../Components/Logo/Logo";
import heroImg from "../assets/authImage.png";

const AuthLayout = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-center h-screen relative ">
                <div className="flex-1 lg:w-1/2 flex flex-col items-center h-full justify-center bg-white">
                    <Outlet></Outlet>
                </div>
                <div className="flex-1 lg:w-1/2 bg-[#FAFDF0] h-full flex items-center justify-center px-13">
                    <img
                        className=" w-full object-cover p-13"
                        src={heroImg}
                        alt="hero"
                    />
                </div>
                <div className="absolute top-0 left-0 mt-11 ml-14 ">
                    <Logo></Logo>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
