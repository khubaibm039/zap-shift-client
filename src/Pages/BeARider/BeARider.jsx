// import { useLocation, useNavigate } from "react-router";
import riderImg from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const BeARider = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    // const { user } = useAuth();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const serviceCenters = useLoaderData();
    const regionDuplicate = serviceCenters.map((c) => c.region);
    const divisions = [...new Set(regionDuplicate)];
    const riderRegion = useWatch({ control, name: "division" });

    const districtByRegion = (region) => {
        const filteredDistricts = serviceCenters.filter(
            (c) => c.region === region,
        );
        const districts = filteredDistricts.map((d) => d.district);
        return districts;
    };
    const onSubmit = (data) => {
        axiosSecure
            .post("/riders", data)
            .then((res) => {
                console.log("user data stored on database", res);
                Swal.fire({
                    title: "Confirmed!",
                    text: "Your Order has been confirmed. please pay",
                    icon: "success",
                    timer: 2500,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        console.log(data);
    };
    return (
        <div className="flex bg-white rounded-2xl min-h-screen justify-center items-center p-8">
            <div className="flex-1 flex flex-col justify-center items-center">
                <divs className="w-full max-w-md">
                    <div className="py-10">
                        <div className=" bg-white rounded-lg">
                            <h1 className="text-5xl font-bold  mb-4">
                                Be a Rider
                            </h1>

                            <p className="text-gray-500 mb-10 leading-relaxed">
                                Enjoy fast, reliable parcel delivery with
                                real-time tracking and zero hassle. From
                                personal packages to business shipments — we
                                deliver on time, every time.
                            </p>

                            <div className=" pt-6">
                                <h2 className="text-3xl font-bold mb-6">
                                    Tell us about yourself
                                </h2>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-5">
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Your Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="input input-bordered w-full"
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                        {errors.name?.type === "required" && (
                                            <p role="alert">Name is required</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Driving License Number
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Driving License Number"
                                            className="input input-bordered w-full"
                                            {...register("licenseNumber", {
                                                required: true,
                                            })}
                                        />
                                        {errors.licenseNumber?.type ===
                                            "required" && (
                                            <p role="alert">
                                                licenseNumber is required
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Your Email
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="input input-bordered w-full"
                                            {...register("email", {
                                                required: true,
                                            })}
                                        />
                                        {errors.email?.type === "required" && (
                                            <p role="alert">
                                                Email is required
                                            </p>
                                        )}
                                    </div>
                                    {/*   Divisions */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Sender Division
                                            </span>
                                        </label>
                                        <select
                                            defaultValue=""
                                            className={`select select-bordered w-full ${
                                                errors.division
                                                    ? "select-error"
                                                    : ""
                                            }`}
                                            {...register("division", {
                                                required: "Select division",
                                            })}>
                                            <option value="" disabled>
                                                Select your Division
                                            </option>
                                            {divisions.map((r, i) => (
                                                <option key={i} value={r}>
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/*  District */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                District
                                            </span>
                                        </label>
                                        <select
                                            defaultValue=""
                                            className={`select select-bordered w-full ${
                                                errors.District
                                                    ? "select-error"
                                                    : ""
                                            }`}
                                            {...register("district", {
                                                required: "Select district",
                                            })}>
                                            <option value="" disabled>
                                                Select your District
                                            </option>
                                            {districtByRegion(riderRegion)?.map(
                                                (district) => (
                                                    <option
                                                        key={district}
                                                        value={district}>
                                                        {district}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                NID No
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="NID"
                                            className="input input-bordered w-full"
                                            {...register("NID", {
                                                required: true,
                                            })}
                                        />
                                        {errors.NID?.type === "required" && (
                                            <p role="alert">NOD is required</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Phone Number
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            className="input input-bordered w-full"
                                            {...register("phone", {
                                                required: true,
                                            })}
                                        />
                                        {errors.phone?.type === "required" && (
                                            <p role="alert">
                                                Phone Number is required
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Bike Brand Model and Year
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Bike Brand Model and Year"
                                            className="input input-bordered w-full"
                                            {...register("bikeBrand", {
                                                required: true,
                                            })}
                                        />
                                        {errors.bikeBrand?.type ===
                                            "required" && (
                                            <p role="alert">
                                                Bike Brand Model and Year is
                                                required
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Bike Registration Number
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Bike Registration Number"
                                            className="input input-bordered w-full"
                                            {...register("bikeRegNumber", {
                                                required: true,
                                            })}
                                        />
                                        {errors.bikeRegNumber?.type ===
                                            "required" && (
                                            <p role="alert">
                                                Bike Registration Number is
                                                required
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Tell Us About Yourself
                                            </span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            placeholder="Tell Us About Yourself"
                                            {...register("about")}></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-full text-black">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </divs>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-center">
                    <img src={riderImg} alt="" className="mx-auto" />
                </div>
            </div>
        </div>
    );
};

export default BeARider;
