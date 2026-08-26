import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { toast } from "react-toastify";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { singInUser } = useAuth();
    const [firebaseError, setFirebaseError] = useState("");

    const onSubmit = (data) => {
        setFirebaseError("");
        console.log(data);
        singInUser(data.email, data.password)
            .then(() => {
                toast.success("Login successful!");
                navigate(location?.state || "/");
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/invalid-credential":
                        setFirebaseError("Incorrect email or password.");
                        break;
                    default:
                        setFirebaseError(
                            "Something went wrong. Please try again.",
                        );
                }
            });
    };

    return (
        <div className="h-full w-full flex items-center justify-center px-44">
            <div className="card-body">
                <div>
                    <h1 className="text-5xl font-extrabold mb-2">
                        Welcome Back
                    </h1>
                    <h3 className="text-lg">Login with ZapShift</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                    <label className="font-medium text-[14px]">Email</label>
                    <input
                        type="email"
                        className="input w-full"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors.email?.type === "required" && (
                        <span className="text-red-500">Email is required</span>
                    )}
                    {errors.email?.type === "minLength" && (
                        <span className="text-red-500">
                            Email must be at least 6 characters
                        </span>
                    )}
                    <label className="font-medium text-[14px] mt-3">
                        Password
                    </label>{" "}
                    <input
                        type="password"
                        className="input w-full"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                        })}
                    />
                    {errors.password?.type === "required" && (
                        <span className="text-red-500">
                            Password is required
                        </span>
                    )}
                    {errors.password?.type === "pattern" && (
                        <span className="text-red-500">
                            Password must contain at least one uppercase letter,
                            one lowercase letter, one number, and one special
                            character
                        </span>
                    )}{" "}
                    {errors.password?.type === "minLength" && (
                        <span className="text-red-500">
                            Password must be at least 6 characters
                        </span>
                    )}
                    <Link
                        state={"/login"}
                        className="underline text-zinc-500 font-regular text-[16px]"
                        to={"/forget-password"}>
                        Forget Password?
                    </Link>
                    {firebaseError && (
                        <p className="text-red-500 text-sm mt-1">
                            {firebaseError}
                        </p>
                    )}
                    <button className="btn bg-primary">Login</button>
                    <div className="mt-3 font-regular text-[16px]">
                        <h3 className="text-zinc-500">
                            Don’t have any account?{" "}
                            <Link
                                state={location.state}
                                to="/register"
                                className="link link-hover text-[#8FA748]">
                                Register
                            </Link>
                        </h3>
                    </div>
                </form>{" "}
                <div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
