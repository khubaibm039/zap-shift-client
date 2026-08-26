import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            parcelType: "document",
        },
    });
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();
    const navigate = useNavigate();
    const duplicateDivisions = serviceCenters.map((c) => c.region);
    const divisions = [...new Set(duplicateDivisions)];
    const senderRegion = useWatch({ control, name: "senderDivision" });
    const receiverRegion = useWatch({ control, name: "receiverDivision" });
    const senderDistrict = useWatch({ control, name: "senderDistrict" });
    const receiverDistrict = useWatch({ control, name: "receiverDistrict" });

    const districtByRegion = (region) => {
        const filteredDistricts = serviceCenters.filter(
            (c) => c.region === region,
        );
        const districts = filteredDistricts.map((d) => d.district)
        return districts;
    };
    const areaByDistrict = (district) => {
        const filteredAreas = serviceCenters.filter(
            (c) => c.district === district,
        );
        const areas = filteredAreas.flatMap((a) => a.covered_area);
        return areas;
    };
    const onSubmit = (data) => {
        const isDocument = data.parcelType === "document";
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const pWeight = parseFloat(data.parcelWeight);
        // eslint-disable-next-line no-useless-assignment
        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 80 : 120;
            if (pWeight > 3) {
                const extraWeight = pWeight - 3;
                const extraCharge = isSameDistrict
                    ? extraWeight * 40
                    : extraWeight * 40 + 40;
                cost += extraCharge;
            }
        } else {
            if (pWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = pWeight - 3;
                const extraCharge = isSameDistrict
                    ? extraWeight * 40
                    : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        console.log("Cost:", cost);
        data.price = cost;

        Swal.fire({
            title: "Please Confirm Your Cost",
            text: `The total cost for your parcel is ${cost} BDT. You won't be able to revert this!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue Payment!",
        }).then((result) => {
            if (result.isConfirmed)
                // ?-------------------------------------------------------------------
            
                //k  save parcel info to the database
                axiosSecure.post("/parcels", data).then((res) => {
                    console.log("after saving parcel ", res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Confirmed!",
                            text: "Your Order has been confirmed. please pay",
                            icon: "success",
                            timer: 2500,
                        });
                        navigate("/dashboard/my-parcels");
                    }
                });
            // ?-------------------------------------------------------------------
        });
    };
    return (
        <div className="max-w-7xl mx-auto bg-base-100 rounded-2xl shadow-sm p-6 md:p-10 my-10 ">
            <div className="mx-20">
                <h1 className="text-3xl md:text-4xl font-extrabold text-secondary">
                    Send A Parcel
                </h1>
                <p className="text-lg font-semibold text-secondary mt-4 mb-4">
                    Enter your parcel details
                </p>
                <div className="divider mt-0"></div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* // ! parcel type */}
                    <div className="flex items-center gap-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="document"
                                className="peer hidden"
                                {...register("parcelType")}
                            />
                            <span
                                className="w-6 h-6 rounded-full border-4 border-gray-200
                       peer-checked:border-green-500 transition-colors"></span>
                            <span className="text-lg font-semibold text-[#03373D]">
                                Document
                            </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="non-document"
                                className="peer hidden"
                                {...register("parcelType")}
                            />
                            <span
                                className="w-6 h-6 rounded-full border-4 border-gray-200
                       peer-checked:border-green-500 transition-colors"></span>
                            <span className="text-lg font-semibold text-[#03373D]">
                                Not-Document
                            </span>
                        </label>
                    </div>
                    {/* parcel details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* parcel name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Parcel Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Parcel Name"
                                className={`input input-bordered w-full ${
                                    errors.parcelName ? "input-error" : ""
                                }`}
                                {...register("parcelName", {
                                    required: "Parcel name is required",
                                })}
                            />
                            {errors.parcelName && (
                                <span className="label-text-alt text-error mt-1">
                                    {errors.parcelName.message}
                                </span>
                            )}
                        </div>
                        {/* parcel weight */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Parcel Weight (KG)
                                </span>
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                placeholder="Parcel Weight (KG)"
                                className="input input-bordered w-full disabled:bg-base-200"
                                {...register("parcelWeight")}
                            />
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Sender details */}

                        <div className="space-y-4">
                            <h3 className="font-bold text-secondary text-lg">
                                Sender Details
                            </h3>
                            {/*  Sender Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Sender Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Sender Name"
                                    defaultValue={user?.displayName}
                                    className={`input input-bordered w-full ${
                                        errors.senderName ? "input-error" : ""
                                    }`}
                                    {...register("senderName", {
                                        required: "Sender name is required",
                                    })}
                                />
                            </div>
                            {/*  Sender email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Sender Email
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Sender email"
                                    defaultValue={user?.email}
                                    className={`input input-bordered w-full ${
                                        errors.senderEmail ? "input-error" : ""
                                    }`}
                                    {...register("senderEmail", {
                                        required: "Sender email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Enter a valid email address",
                                        },
                                    })}
                                />
                            </div>
                            {/*sender Address */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Address
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className={`input input-bordered w-full ${
                                        errors.senderAddress
                                            ? "input-error"
                                            : ""
                                    }`}
                                    {...register("senderAddress", {
                                        required: "Address is required",
                                    })}
                                />
                            </div>
                            {/* Sender Phone No */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Sender Phone No
                                    </span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Sender Phone No"
                                    className={`input input-bordered w-full ${
                                        errors.senderPhone ? "input-error" : ""
                                    }`}
                                    {...register("senderPhone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9+\- ]{7,15}$/,
                                            message:
                                                "Enter a valid phone number",
                                        },
                                    })}
                                />
                            </div>
                            {/*   Sender Divisions */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Sender Division
                                    </span>
                                </label>
                                <select
                                    defaultValue=""
                                    className={`select select-bordered w-full ${
                                        errors.senderDivision
                                            ? "select-error"
                                            : ""
                                    }`}
                                    {...register("senderDivision", {
                                        required: "Select sender division",
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
                            {/*   Sender District */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Sender District
                                    </span>
                                </label>
                                <select
                                    defaultValue=""
                                    className={`select select-bordered w-full ${
                                        errors.senderDistrict
                                            ? "select-error"
                                            : ""
                                    }`}
                                    {...register("senderDistrict", {
                                        required: "Select sender district",
                                    })}>
                                    <option value="" disabled>
                                        Select your District
                                    </option>
                                    {districtByRegion(senderRegion)?.map(
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
                            {/*   Sender Area */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Sender Area
                                    </span>
                                </label>
                                <select
                                    defaultValue="pick an area"
                                    className={`select select-bordered w-full ${
                                        errors.senderArea ? "select-error" : ""
                                    }`}
                                    {...register("senderArea", {
                                        required: "Select your area",
                                    })}>
                                    <option value="" disabled={true}>
                                        Select your Area
                                    </option>
                                    {areaByDistrict(senderDistrict)?.map(
                                        (area) => (
                                            <option key={area} value={area}>
                                                {area}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                            {/*  Pickup Instruction */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Pickup Instruction
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Pickup Instruction"
                                    rows={4}
                                    className={`textarea textarea-bordered w-full ${
                                        errors.pickupInstruction
                                            ? "textarea-error"
                                            : ""
                                    }`}
                                    {...register(
                                        "pickupInstruction",
                                    )}></textarea>
                            </div>
                        </div>

                        {/* Receiver details*/}
                        <div className="space-y-4">
                            <h3 className="font-bold text-secondary text-lg">
                                Receiver Details
                            </h3>
                            {/*  Receiver Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Receiver Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    className={`input input-bordered w-full ${
                                        errors.receiverName ? "input-error" : ""
                                    }`}
                                    {...register("receiverName", {
                                        required: "Receiver name is required",
                                    })}
                                />
                            </div>
                            {/*  receiver email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Receiver Email
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Receiver email"
                                    className={`input input-bordered w-full ${
                                        errors.receiverEmail
                                            ? "input-error"
                                            : ""
                                    }`}
                                    {...register("receiverEmail", {
                                        required: "Receiver email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Enter a valid email address",
                                        },
                                    })}
                                />
                            </div>
                            {/*  Receiver Address */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Receiver Address
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className={`input input-bordered w-full ${
                                        errors.receiverAddress
                                            ? "input-error"
                                            : ""
                                    }`}
                                    {...register("receiverAddress", {
                                        required: "Address is required",
                                    })}
                                />
                            </div>
                            {/*  Receiver Contact No */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Receiver Contact No
                                    </span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Receiver Contact No"
                                    className={`input input-bordered w-full ${
                                        errors.receiverPhone
                                            ? "input-error"
                                            : ""
                                    }`}
                                    {...register("receiverPhone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9+\- ]{7,15}$/,
                                            message:
                                                "Enter a valid phone number",
                                        },
                                    })}
                                />
                            </div>
                            {/*   Receiver Divisions */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Receiver Division
                                    </span>
                                </label>
                                <select
                                    defaultValue=""
                                    className={`select select-bordered w-full ${
                                        errors.receiverDivision
                                            ? "select-error"
                                            : ""
                                    }`}
                                    {...register("receiverDivision", {
                                        required: "Select receiver division",
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
                            {/*  Receiver District */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Receiver District
                                    </span>
                                </label>
                                <select
                                    defaultValue=""
                                    className={`select select-bordered w-full ${
                                        errors.receiverDistrict
                                            ? "select-error"
                                            : ""
                                    }`}
                                    {...register("receiverDistrict", {
                                        required: "Select receiver district",
                                    })}>
                                    <option value="" disabled>
                                        Select your District
                                    </option>
                                    {districtByRegion(receiverRegion)?.map(
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
                            {/*   receiver Area */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Receiver Area
                                    </span>
                                </label>
                                <select
                                    defaultValue="pick an area"
                                    className={`select select-bordered w-full ${
                                        errors.receiverArea
                                            ? "select-error"
                                            : ""
                                    }`}
                                    {...register("receiverArea", {
                                        required: "Select your area",
                                    })}>
                                    <option value="" disabled={true}>
                                        Select your Area
                                    </option>
                                    {areaByDistrict(receiverDistrict)?.map(
                                        (area) => (
                                            <option key={area} value={area}>
                                                {area}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                            {/*  Delivery Instruction */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Delivery Instruction
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Delivery Instruction"
                                    rows={4}
                                    className={`textarea textarea-bordered w-full ${
                                        errors.deliveryInstruction
                                            ? "textarea-error"
                                            : ""
                                    }`}
                                    {...register(
                                        "deliveryInstruction",
                                    )}></textarea>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-base-content/60">
                        * PickUp Time 4pm-7pm Approx.
                    </p>
                    <button
                        type="submit"
                        className="btn btn-primary text-black font-semibold">
                        Proceed to Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;
