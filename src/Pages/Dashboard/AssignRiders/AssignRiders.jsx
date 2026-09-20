// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useRef, useState } from "react";
// import Swal from "sweetalert2";

// const AssignRiders = () => {
//     const [selectedParcel, setSelectedParcel] = useState("");
//     const axiosSecure = useAxiosSecure();
//     const riderModalRef = useRef();

//     const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
//         queryKey: ["parcels", "pending-pickup"],
//         queryFn: async () => {
//             const res = await axiosSecure.get(
//                 "/parcels?deliveryStatus=pending-pickup",
//             );
//             return res.data;
//         },
//     });
//     const { data: riders = [], refetch: ridersRefetch } = useQuery({
//         queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
//         enabled: !!selectedParcel,
//         queryFn: async () => {
//             const res = await axiosSecure.get(
//                 `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`,
//             );
//             return res.data;
//         },
//     });

//     const openAssignRiderModal = (parcel) => {
//         riderModalRef.current.showModal();
//         setSelectedParcel(parcel);
//     };

//     const handleAssignRider = (rider) => {
//         const riderAssignInfo = {
//             riderId: rider._id,
//             riderEmail: rider.email,
//             riderName: rider.name,
//             parcelId: selectedParcel._id,
//             trackingId: selectedParcel.trackingId,
//         };

//         axiosSecure
//             .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
//             .then((res) => {
//                 if (res.data.modifiedCount) {
//                     riderModalRef.current.close();
//                     parcelsRefetch();
//                     ridersRefetch();
//                     Swal.fire({
//                         title: "Assigned!",
//                         text: "Rider has been Assigned.",
//                         showConfirmButton: false,
//                         icon: "success",
//                     });
//                 }
//             });
//     };
//     console.log(riders);

//     return (
//         <div className="max-w-6xl mx-auto">
//             <h2 className="text-5xl">Assign Rider : {parcels.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Cost</th>
//                             <th>Pickup District</th>
//                             <th>created At</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {parcels.map((parcel, index) => (
//                             <tr key={parcel._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{parcel.createAt}</td>
//                                 <td>{parcel.price}</td>
//                                 <td>{parcel.senderDistrict}</td>
//                                 <td>{parcel.createAt}</td>
//                                 <td>
//                                     <button
//                                         onClick={() =>
//                                             openAssignRiderModal(parcel)
//                                         }
//                                         className="btn btn-primary text-black">
//                                         Find Rider
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {/* Open the modal using document.getElementById('ID').showModal() method */}

//                 <dialog
//                     ref={riderModalRef}
//                     className="modal modal-bottom sm:modal-middle">
//                     <div className="modal-box">
//                         <h3 className="font-bold text-lg">
//                             Riders : {riders.length}
//                         </h3>
//                         <div className="overflow-x-auto">
//                             <table className="table table-zebra">
//                                 {/* head */}
//                                 <thead>
//                                     <tr>
//                                         <th></th>
//                                         <th>Name</th>
//                                         <th>Job</th>
//                                         <th>Favorite Color</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {riders.map((rider, i) => (
//                                         <tr key={rider._id}>
//                                             <th>{i + 1}</th>
//                                             <td>{rider.name}</td>
//                                             <td>{rider.email}</td>
//                                             <td>
//                                                 <button
//                                                     onClick={() =>
//                                                         handleAssignRider(rider)
//                                                     }
//                                                     className="btn btn-primary text-black">
//                                                     Assign
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>

//                         <div className="modal-action">
//                             <form method="dialog">
//                                 {/* if there is a button in form, it will close the modal */}
//                                 <button className="btn">Close</button>
//                             </form>
//                         </div>
//                     </div>
//                 </dialog>
//             </div>
//         </div>
//     );
// };

// export default AssignRiders;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { FaMotorcycle, FaBoxOpen } from "react-icons/fa";

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState("");
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();

    const { data: parcels = [], isLoading, refetch: parcelsRefetch } = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?deliveryStatus=pending-pickup",
            );
            return res.data;
        },
    });
    const { data: riders = [], refetch: ridersRefetch } = useQuery({
        queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`,
            );
            return res.data;
        },
    });

    const openAssignRiderModal = (parcel) => {
        riderModalRef.current.showModal();
        setSelectedParcel(parcel);
    };

    const handleAssignRider = (rider) => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId,
        };

        axiosSecure
            .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then((res) => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close();
                    parcelsRefetch();
                    ridersRefetch();
                    Swal.fire({
                        title: "Assigned!",
                        text: "Rider has been Assigned.",
                        showConfirmButton: false,
                        icon: "success",
                    });
                }
            });
    };

    const formatDate = (isoString) => {
        if (!isoString) return "—";
        return new Date(isoString).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Assign Rider</h2>
                <p className="text-sm text-gray-400">
                    {parcels.length} parcel{parcels.length !== 1 && "s"} awaiting pickup
                </p>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-lime-400"></span>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && parcels.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-2xl border border-base-200">
                    <FaBoxOpen className="text-5xl text-gray-300 mb-4" />
                    <p className="text-gray-500">No parcels awaiting pickup.</p>
                </div>
            )}

            {/* Table */}
            {!isLoading && parcels.length > 0 && (
                <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="py-4">#</th>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Pickup District</th>
                                <th>Created At</th>
                                <th className="text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className="hover:bg-gray-50 transition-colors border-b border-base-200 last:border-none"
                                >
                                    <th className="text-gray-400 font-normal">
                                        {index + 1}
                                    </th>
                                    <td className="font-medium text-gray-700">
                                        {parcel.parcelName}
                                    </td>
                                    <td className="text-gray-600">৳{parcel.price}</td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                            {parcel.senderDistrict}
                                        </span>
                                    </td>
                                    <td className="text-gray-500 text-sm">
                                        {formatDate(parcel.createAt)}
                                    </td>
                                    <td className="text-right pr-2">
                                        <button
                                            onClick={() => openAssignRiderModal(parcel)}
                                            className="btn btn-sm bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold"
                                        >
                                            Find Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Rider selection modal */}
            <dialog
                ref={riderModalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                        Available Riders
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        {riders.length} rider{riders.length !== 1 && "s"} in{" "}
                        {selectedParcel?.senderDistrict || "this district"}
                    </p>

                    {riders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-xl">
                            <FaMotorcycle className="text-4xl text-gray-300 mb-3" />
                            <p className="text-gray-500 text-sm">
                                No available riders in this district right now.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th className="text-right pr-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {riders.map((rider, i) => (
                                        <tr
                                            key={rider._id}
                                            className="border-b border-base-200 last:border-none"
                                        >
                                            <th className="text-gray-400 font-normal">
                                                {i + 1}
                                            </th>
                                            <td className="font-medium text-gray-700">
                                                {rider.name}
                                            </td>
                                            <td className="text-gray-500 text-sm">
                                                {rider.email}
                                            </td>
                                            <td className="text-right pr-2">
                                                <button
                                                    onClick={() =>
                                                        handleAssignRider(rider)
                                                    }
                                                    className="btn btn-sm bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold"
                                                >
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;