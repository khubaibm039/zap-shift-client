// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { FaRegEdit, FaTrash } from "react-icons/fa";
// import { HiMiniMagnifyingGlass } from "react-icons/hi2";
// import Swal from "sweetalert2";
// import { Link } from "react-router";

// const MyParcels = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: parcels = [], refetch } = useQuery({
//         queryKey: ["my-parcels", user.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/parcels?email=${user.email}`);
//             return res.data;
//         },
//     });

//     const handleParcelDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/parcels/${id}`).then((res) => {
//                     if (res.data.deletedCount) {
//                         // ? refresh the data
//                         refetch();
//                         Swal.fire({
//                             title: "Deleted!",
//                             text: "Your parcel has been deleted.",
//                             icon: "success",
//                         });
//                     }
//                 });
//             }
//         });
//     };

//     const handlePayment = async (parcel) => {
//         const paymentInfo = {
//             price: parcel?.price,
//             parcelId: parcel?._id,
//             senderEmail: parcel?.senderEmail,
//             parcelName: parcel?.parcelName,
//             trackingId: parcel.trackingId,
//         };
//         const res = await axiosSecure.post(
//             "/create-checkout-session",
//             paymentInfo,
//         );
//         if (res.data?.url) {
//             window.location.assign(res.data.url);
//         }
//     };

//     return (
//         <div  className="max-w-6xl mx-auto">
//             <h2>all parcels {parcels.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Cost</th>
//                             <th>Payment </th>
//                             <th>Tracking Id </th>
//                             <th>Delivery Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {parcels.map((parcel, index) => (
//                             <tr key={parcel._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{parcel.parcelName}</td>
//                                 <td>{parcel.price}</td>
//                                 <td>
//                                     {parcel.paymentStatus === "paid" ? (
//                                         <span className="text-green-700 ">
//                                             paid
//                                         </span>
//                                     ) : (
//                                         <button
//                                             onClick={() =>
//                                                 handlePayment(parcel)
//                                             }
//                                             className="btn-primary text-black btn btn-sm">
//                                             Pay
//                                         </button>
//                                     )}
//                                 </td>
//                                 <td>
//                                     <Link
//                                         to={`/parcel-track/${parcel.trackingId}`}>
//                                         {parcel.trackingId}
//                                     </Link>
//                                 </td>
//                                 <td>{parcel.deliveryStatus}</td>
//                                 <td className="flex gap-4">
//                                     <button className="btn btn-square hover:bg-primary">
//                                         <FaRegEdit></FaRegEdit>
//                                     </button>
//                                     <button className="btn btn-square hover:bg-primary">
//                                         <HiMiniMagnifyingGlass />
//                                     </button>
//                                     <button
//                                         className="btn btn-square hover:bg-primary"
//                                         onClick={() =>
//                                             handleParcelDelete(parcel._id)
//                                         }>
//                                         <FaTrash />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default MyParcels;

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaRegEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: parcels = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["my-parcels", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#84cc16",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`).then((res) => {
                    if (res.data.deletedCount) {
                        // ? refresh the data
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your parcel has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            price: parcel?.price,
            parcelId: parcel?._id,
            senderEmail: parcel?.senderEmail,
            parcelName: parcel?.parcelName,
            trackingId: parcel.trackingId,
        };
        const res = await axiosSecure.post(
            "/create-checkout-session",
            paymentInfo,
        );
        if (res.data?.url) {
            window.location.assign(res.data.url);
        }
    };

    // Small helper to style delivery status as a badge
    const statusBadge = (status) => {
        const map = {
            parcel_paid: "bg-blue-100 text-blue-700",
            parcel_delivered: "bg-green-100 text-green-700",
            parcel_pending: "bg-yellow-100 text-yellow-700",
            parcel_cancelled: "bg-red-100 text-red-700",
        };
        const style = map[status] || "bg-gray-100 text-gray-600";
        const label = status
            ? status
                  .replace("parcel_", "")
                  .replace(/^\w/, (c) => c.toUpperCase())
            : "Unknown";
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
                {label}
            </span>
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        My Parcels
                    </h2>
                    <p className="text-sm text-gray-400">
                        {parcels.length} parcel{parcels.length !== 1 && "s"}{" "}
                        total
                    </p>
                </div>
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
                        You haven&apos;t sent any parcels yet.
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
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Payment</th>
                                <th>Tracking ID</th>
                                <th>Delivery Status</th>
                                <th className="text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className="hover:bg-gray-50 transition-colors border-b border-base-200 last:border-none">
                                    <th className="text-gray-400 font-normal">
                                        {index + 1}
                                    </th>
                                    <td className="font-medium text-gray-700">
                                        {parcel.parcelName}
                                    </td>
                                    <td className="text-gray-600">
                                        ৳{parcel.price}
                                    </td>
                                    <td>
                                        {parcel.paymentStatus === "paid" ? (
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                Paid
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handlePayment(parcel)
                                                }
                                                className="btn btn-sm bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold">
                                                Pay
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/parcel-track/${parcel.trackingId}`}
                                            className="text-blue-600 hover:underline font-mono text-xs">
                                            {parcel.trackingId}
                                        </Link>
                                    </td>
                                    <td>
                                        {statusBadge(parcel.deliveryStatus)}
                                    </td>
                                    <td>
                                        <div className="flex gap-2 justify-end pr-2">
                                            <button
                                                className="btn btn-square btn-sm bg-gray-50 hover:bg-lime-100 border border-base-200"
                                                aria-label="Edit parcel">
                                                <FaRegEdit className="text-gray-600" />
                                            </button>
                                            <button
                                                className="btn btn-square btn-sm bg-gray-50 hover:bg-lime-100 border border-base-200"
                                                aria-label="View parcel">
                                                <HiMiniMagnifyingGlass className="text-gray-600" />
                                            </button>
                                            <button
                                                className="btn btn-square btn-sm bg-gray-50 hover:bg-red-100 border border-base-200"
                                                onClick={() =>
                                                    handleParcelDelete(
                                                        parcel._id,
                                                    )
                                                }
                                                aria-label="Delete parcel">
                                                <FaTrash className="text-red-500" />
                                            </button>
                                        </div>
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

export default MyParcels;
