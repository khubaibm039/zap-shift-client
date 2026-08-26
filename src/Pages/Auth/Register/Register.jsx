import { useForm } from "react-hook-form";
import icon from "../../../assets/image-upload-icon.png";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { registerUser, updateUserProfile } = useAuth();

    const [firebaseError, setFirebaseError] = useState("");

    const onSubmit = (data) => {
        setFirebaseError("");

        console.log(data.photo[0]);
        const profileImage = data.photo[0];

        registerUser(data.email, data.password, data.name)
            .then(() => {
                navigate(location?.state || "/");
                //? --------------------------------------------------------------
                //k         1. store the image and get the photo url
                //? --------------------------------------------------------------
                const formData = new FormData();
                formData.append("image", profileImage);
                //? --------------------------------------------------------------
                //k         2. send the image to imgbb and get the url
                //? --------------------------------------------------------------
                const imageAPIUrl = `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_image_hostng_api_key}`;
                axios.post(imageAPIUrl, formData).then((res) => {
                    const photoURL = res.data.data.url;

                    //?--------------------------------------------------------------
                    //k     create user in the database
                    //? --------------------------------------------------------------
                    const userInfo = {
                        email: data.email,
                        displayName: data.name,
                        photoURL: photoURL,
                    };

                    axiosSecure.post("/users", userInfo).then((res) => {
                        if (res.data.insertedId){
                            console.log("user create in the database")
                        }
                    });

                    //? --------------------------------------------------------------
                    //k              3.update the user profile with the photo url
                    //? --------------------------------------------------------------
                    const userProfile = {
                        displayName: data.name,
                        photoURL: photoURL,
                    };

                    updateUserProfile(userProfile)
                        .then(() => {
                            console.log("user profile updated");
                        })
                        .catch((err) => console.log(err));
                });
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setFirebaseError(
                            "This email is already registered. Try logging in.",
                        );
                        break;
                    case "auth/weak-password":
                        setFirebaseError("Password is too weak.");
                        break;
                    default:
                        setFirebaseError(
                            "Something went wrong. Please try again.",
                        );
                }
            });
    };

    return (
        <div className="h-full w-full flex items-center justify-center lg:px-30">
            <div className="card-body">
                <div>
                    <h1 className="text-5xl font-extrabold mb-2">
                        Create an Account
                    </h1>
                    <h3 className="text-lg">Register with ZapShift</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                    <label className="cursor-pointer w-fit">
                        <img src={icon} alt="Upload Icon" className="" />
                        <input
                            type="file"
                            className="hidden"
                            {...register("photo", { required: true })}
                        />
                        {errors.photo?.type === "required" && (
                            <span className="text-red-500">
                                Photo is required
                            </span>
                        )}
                    </label>
                    <label className="font-medium text-[14px]">Name</label>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
                    {errors.name?.type === "required" && (
                        <span className="text-red-500">Name is required</span>
                    )}
                    <label className="font-medium text-[14px] mt-3">
                        Email
                    </label>
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
                    {firebaseError && (
                        <p className="text-red-500 text-sm mt-1">
                            {firebaseError}
                        </p>
                    )}
                    <button className="btn  mt-4 bg-primary">Register</button>
                    <div className="mt-3 font-regular text-[16px]">
                        <h3 className="text-zinc-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="link link-hover text-[#8FA748]">
                                Login
                            </Link>
                        </h3>
                    </div>
                </form>
                <div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;
