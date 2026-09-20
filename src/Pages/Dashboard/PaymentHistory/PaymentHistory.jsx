// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const PaymentHistory = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     console.log(user.displayName)

//     const { data: payments = [] } = useQuery({
//         queryKey: ["payments", user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/payments?email=${user.email}`);
//             return res.data;

//         },

//     });
//      console.log(payments)

//     return (
//         <div  className="max-w-6xl mx-auto">
//             <h2 className="text-5xl"> Payment History : {payments.length} </h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Amount</th>
//                             <th>Transaction Id</th>
//                             <th>Paid At</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {payments.map((pay, index) => (
//                             <tr key={pay._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{pay.displayName}</td>
//                                 <td>${pay.amount}</td>
//                                 <td>{pay.transactionId}</td>
//                                 <td>{pay.paidAt}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentHistory;

// import { useQuery } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaReceipt } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    const copyToClipboard = (text) => {
        if (text) navigator.clipboard.writeText(text);
    };

    const formatDate = (isoString) => {
        if (!isoString) return "—";
        const date = new Date(isoString);
        return date.toLocaleString(undefined, {
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
                <h2 className="text-2xl font-bold text-gray-800">
                    Payment History
                </h2>
                <p className="text-sm text-gray-400">
                    {payments.length} payment{payments.length !== 1 && "s"}{" "}
                    total
                </p>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-lime-400"></span>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && payments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-2xl border border-base-200">
                    <FaReceipt className="text-5xl text-gray-300 mb-4" />
                    <p className="text-gray-500">No payments yet.</p>
                </div>
            )}

            {/* Table */}
            {!isLoading && payments.length > 0 && (
                <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="py-4">#</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Transaction ID</th>
                                <th>Paid At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((pay, index) => (
                                <tr
                                    key={pay._id}
                                    className="hover:bg-gray-50 transition-colors border-b border-base-200 last:border-none">
                                    <th className="text-gray-400 font-normal">
                                        {index + 1}
                                    </th>
                                    <td className="font-medium text-gray-700">
                                        {pay.displayName ||
                                            user?.displayName ||
                                            "—"}
                                    </td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            ${pay.amount}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    pay.transactionId,
                                                )
                                            }
                                            className="font-mono text-xs text-gray-600 hover:text-lime-600 transition-colors"
                                            title="Click to copy">
                                            {pay.transactionId}
                                        </button>
                                    </td>
                                    <td className="text-gray-500 text-sm">
                                        {formatDate(pay.paidAt)}
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

export default PaymentHistory;
