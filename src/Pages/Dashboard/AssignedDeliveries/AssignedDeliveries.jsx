// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const AssignedDeliveries = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const { data: parcels = [], refetch } = useQuery({
//         queryKey: ["parcels", user.email, "driver_assigned"],
//         queryFn: async () => {
//             const res = await axiosSecure.get(
//                 `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
//             );
//             return res.data;
//         },
//     });
//     const handleDeliveryStatusUpdate = (parcel, status) => {
//         const statusInfo = {
//             deliveryStatus: status,
//             riderId: parcel.riderId,
//             trackingId: parcel.trackingId,
//         };
//         let massage = `parcel status is updated with ${status.split("_").join(" ")}`;
//         axiosSecure
//             .patch(`/parcels/${parcel._id}/status`, statusInfo)
//             .then((res) => {
//                 if (res.data.modifiedCount) {
//                     refetch();
//                     Swal.fire({
//                         title: massage,
//                         text: "Thank You for Accepting.",
//                         showConfirmButton: false,
//                         icon: "success",
//                     });
//                 }
//             });
//     };
//     return (
//         <div  className="max-w-6xl mx-auto">
//             <h2 className="font-black text-5xl">
//                 this is the page where rider can accept or reject the ride
//             </h2>

//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Parcel Name</th>
//                             <th>Confirm</th>
//                             <th>Other Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {parcels.map((parcel, i) => (
//                             <tr key={parcel._id}>
//                                 <th>{i + 1}</th>
//                                 <td>{parcel.parcelName}</td>
//                                 <td>
//                                     {parcel.deliveryStatus ===
//                                     "driver_assigned" ? (
//                                         <>
//                                             <button
//                                                 onClick={() =>
//                                                     handleDeliveryStatusUpdate(
//                                                         parcel,
//                                                         "rider_arriving",
//                                                     )
//                                                 }
//                                                 className="btn btn-soft btn-primary text-black mr-2">
//                                                 Accept
//                                             </button>
//                                             <button className="btn btn-warning text-black">
//                                                 Reject
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <span className="text-green-500">
//                                             Accepted
//                                         </span>
//                                     )}
//                                 </td>
//                                 <td>
//                                     {parcel.deliveryStatus ===
//                                     "parcel_picked_up" ? (
//                                         <>
//                                             <button
//                                                 onClick={() =>
//                                                     handleDeliveryStatusUpdate(
//                                                         parcel,
//                                                         "parcel_delivered",
//                                                     )
//                                                 }
//                                                 className="btn btn-soft btn-ghost btn-info">
//                                                 Mark as delivered
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <button
//                                                 onClick={() =>
//                                                     handleDeliveryStatusUpdate(
//                                                         parcel,
//                                                         "parcel_picked_up",
//                                                     )
//                                                 }
//                                                 className="btn btn-soft btn-accent btn-ghost">
//                                                 Mark as picked up
//                                             </button>
//                                         </>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                         {/* row 1 */}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AssignedDeliveries;
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBoxOpen } from "react-icons/fa";

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        data: parcels = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["parcels", user.email, "driver_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
            );
            return res.data;
        },
    });

    const handleDeliveryStatusUpdate = (parcel, status) => {
        const statusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId,
        };
        let massage = `parcel status is updated with ${status.split("_").join(" ")}`;
        axiosSecure
            .patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: massage,
                        text: "Thank You for Accepting.",
                        showConfirmButton: false,
                        icon: "success",
                    });
                }
            });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Assigned Deliveries
                </h2>
                <p className="text-sm text-gray-400">
                    Accept your assigned parcels and update their delivery
                    status
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
                    <p className="text-gray-500">
                        No parcels assigned to you right now.
                    </p>
                </div>
            )}

            {/* Table */}
            {!isLoading && parcels.length > 0 && (
                <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="py-4">#</th>
                                <th>Parcel Name</th>
                                <th>Confirm</th>
                                <th>Other Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, i) => (
                                <tr
                                    key={parcel._id}
                                    className="hover:bg-gray-50 transition-colors border-b border-base-200 last:border-none">
                                    <th className="text-gray-400 font-normal">
                                        {i + 1}
                                    </th>
                                    <td className="font-medium text-gray-700">
                                        {parcel.parcelName}
                                    </td>
                                    <td>
                                        {parcel.deliveryStatus ===
                                        "driver_assigned" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleDeliveryStatusUpdate(
                                                            parcel,
                                                            "rider_arriving",
                                                        )
                                                    }
                                                    className="btn btn-sm bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold">
                                                    Accept
                                                </button>
                                                <button className="btn btn-sm bg-red-50 hover:bg-red-100 text-red-600 border-none">
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                Accepted
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {parcel.deliveryStatus ===
                                        "parcel_picked_up" ? (
                                            <button
                                                onClick={() =>
                                                    handleDeliveryStatusUpdate(
                                                        parcel,
                                                        "parcel_delivered",
                                                    )
                                                }
                                                className="btn btn-sm bg-blue-50 hover:bg-blue-100 text-blue-700 border-none">
                                                Mark as delivered
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleDeliveryStatusUpdate(
                                                        parcel,
                                                        "parcel_picked_up",
                                                    )
                                                }
                                                className="btn btn-sm bg-purple-50 hover:bg-purple-100 text-purple-700 border-none">
                                                Mark as picked up
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AssignedDeliveries;
