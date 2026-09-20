// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const CompletedDeliveries = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const { data: parcels = [], } = useQuery({
//         queryKey: ["parcels", user.email, "driver_assigned"],
//         queryFn: async () => {
//             const res = await axiosSecure.get(
//                 `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
//             );
//             return res.data;
//         },
//     });
//     const calculatePayout = (parcel) => {
//         if (parcel.senderDistrict === parcel.receiverDistrict) {
//             return parcel.price * 0.8;
//         } else {
//             return parcel.price * 0.6;
//         }
//     };
//     return (
//         <div  className="max-w-6xl mx-auto">
//             <h2 className="text-5xl">completed deliveries : {parcels.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Pickup District</th>
//                             <th>Cost</th>
//                             <th>Payout</th>
//                             <th>created At</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {parcels.map((parcel, index) => (
//                             <tr key={parcel._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{parcel.createAt}</td>
//                                 <td>{parcel.senderDistrict}</td>
//                                 <td>{parcel.price}</td>
//                                 <td>{calculatePayout(parcel)}</td>
//                                 <td>{parcel.createAt}</td>
//                                 <td>
//                                     <button className="btn btn-soft btn-info">Cash Out</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default CompletedDeliveries;
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaWallet } from "react-icons/fa";

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["parcels", user.email, "driver_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
            );
            return res.data;
        },
    });

    const calculatePayout = (parcel) => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.price * 0.8;
        } else {
            return parcel.price * 0.6;
        }
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

    const totalPayout = parcels.reduce(
        (sum, parcel) => sum + calculatePayout(parcel),
        0,
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Completed Deliveries
                    </h2>
                    <p className="text-sm text-gray-400">
                        {parcels.length} deliver
                        {parcels.length !== 1 ? "ies" : "y"} completed
                    </p>
                </div>
                {parcels.length > 0 && (
                    <div className="bg-lime-50 border border-lime-200 rounded-xl px-4 py-2 text-right">
                        <p className="text-xs text-lime-700 uppercase tracking-wide">
                            Total Payout
                        </p>
                        <p className="text-lg font-bold text-lime-700">
                            ৳{totalPayout.toFixed(2)}
                        </p>
                    </div>
                )}
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
                    <FaWallet className="text-5xl text-gray-300 mb-4" />
                    <p className="text-gray-500">
                        No completed deliveries yet.
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
                                <th>Pickup District</th>
                                <th>Cost</th>
                                <th>Payout</th>
                                <th>Created At</th>
                                <th className="text-right pr-6">Actions</th>
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
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                            {parcel.senderDistrict}
                                        </span>
                                    </td>
                                    <td className="text-gray-600">
                                        ৳{parcel.price}
                                    </td>
                                    <td className="font-medium text-green-700">
                                        ৳{calculatePayout(parcel).toFixed(2)}
                                    </td>
                                    <td className="text-gray-500 text-sm">
                                        {formatDate(parcel.createAt)}
                                    </td>
                                    <td className="text-right pr-2">
                                        <button className="btn btn-sm bg-blue-50 hover:bg-blue-100 text-blue-700 border-none">
                                            Cash Out
                                        </button>
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

export default CompletedDeliveries;
