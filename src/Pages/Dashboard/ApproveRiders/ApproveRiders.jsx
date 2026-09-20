// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { FaEye, FaTrash, FaUserCheck } from "react-icons/fa";
// import { IoPersonRemoveSharp } from "react-icons/io5";
// import Swal from "sweetalert2";
// const ApproveRiders = () => {
//     const axiosSecure = useAxiosSecure();
//     const { refetch, data: riders = [] } = useQuery({
//         queryKey: ["riders", "pending"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/riders");
//             return res.data;
//         },
//     });

//     const updateRiderStatus = (rider, status) => {
//         const updateInfo = { status: status, email: rider.email };
//         axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
//             if (res.data.modifiedCount) {
//                 refetch();
//                 Swal.fire({
//                     title: "Confirmed!",
//                     text: `Rider status set to ${status}.`,
//                     icon: "success",
//                     timer: 2500,
//                 });
//             }
//         });
//     };

//     const handleApproval = (rider) => {
//         updateRiderStatus(rider, "approved");
//     };
//     const handleRejection = (rider) => {
//         updateRiderStatus(rider, "rejected");
//     };

//     const handleDeleteRider = (id) => {
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
//                 axiosSecure.delete(`/riders/${id}`).then((res) => {
//                     if (res.data.deletedCount) {
//                         refetch();
//                         Swal.fire({
//                             title: "Deleted!",
//                             text: "Rider has been deleted.",
//                             icon: "success",
//                         });
//                     }
//                 });
//             }
//         });
//     };
//     const InfoRow = ({ label, value }) => (
//         <div className="grid grid-cols-[90px_1fr] gap-2 text-sm">
//             <span className="text-gray-400">{label}</span>
//             <span className="text-gray-700 font-medium">{value || "N/A"}</span>
//         </div>
//     );

//     return (
//         <div className="max-w-6xl mx-auto">
//             <div className="text-5xl">
//                 Riders pending Approval {riders.length}
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Districts</th>
//                             <th>Application Status</th>
//                             <th>Work Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {riders.map((rider, index) => (
//                             <tr key={rider._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{rider.name}</td>
//                                 <td>{rider.email}</td>
//                                 <td>{rider.district}</td>
//                                 <td>
//                                     {
//                                         <p
//                                             className={`${rider.status === "approved" ? "text-green-800" : "text-blue-500"} ${rider.status === "rejected" ? "text-red-500" : "text-blue-500"} `}>
//                                             {rider.status}
//                                         </p>
//                                     }
//                                 </td>
//                                 <td>{rider.workStatus}</td>

//                                 <td>
//                                     {/* Open the modal using document.getElementById('ID').showModal() method */}
//                                     <button
//                                         className="btn"
//                                         onClick={() =>
//                                             document
//                                                 .getElementById("my_modal_2")
//                                                 .showModal()
//                                         }>
//                                         <FaEye></FaEye>
//                                     </button>
//                                     <dialog id="my_modal_2" className="modal">
//                                         <div className="modal-box max-w-md">
//                                             <h3 className="font-bold text-xl mb-4">
//                                                 Rider Info
//                                             </h3>

//                                             <div className="bg-base-200 rounded-xl p-4 space-y-3">
//                                                 <InfoRow
//                                                     label="Name"
//                                                     value={rider?.name}
//                                                 />
//                                                 <InfoRow
//                                                     label="Phone"
//                                                     value={rider?.phone}
//                                                 />
//                                                 <InfoRow
//                                                     label="Email"
//                                                     value={rider?.email}
//                                                 />
//                                                 <InfoRow
//                                                     label="district"
//                                                     value={rider?.district}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <form
//                                             method="dialog"
//                                             className="modal-backdrop">
//                                             <button>close</button>
//                                         </form>
//                                     </dialog>
//                                     <button
//                                         onClick={() => handleApproval(rider)}
//                                         className="btn">
//                                         <FaUserCheck></FaUserCheck>
//                                     </button>
//                                     <button
//                                         className="btn"
//                                         onClick={() => handleRejection(rider)}>
//                                         <IoPersonRemoveSharp></IoPersonRemoveSharp>
//                                     </button>
//                                     <button
//                                         onClick={() =>
//                                             handleDeleteRider(rider._id)
//                                         }
//                                         className="btn">
//                                         <FaTrash></FaTrash>
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

// export default ApproveRiders;


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaTrash, FaUserCheck, FaUserClock } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: riders = [], isLoading } = useQuery({
        queryKey: ["riders", "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders");
            return res.data;
        },
    });

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email };
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    title: "Confirmed!",
                    text: `Rider status set to ${status}.`,
                    icon: "success",
                    timer: 2500,
                });
            }
        });
    };

    const handleApproval = (rider) => {
        updateRiderStatus(rider, "approved");
    };
    const handleRejection = (rider) => {
        updateRiderStatus(rider, "rejected");
    };

    const handleDeleteRider = (id) => {
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
                axiosSecure.delete(`/riders/${id}`).then((res) => {
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Rider has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    const InfoRow = ({ label, value }) => (
        <div className="grid grid-cols-[90px_1fr] gap-2 text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="text-gray-700 font-medium">{value || "N/A"}</span>
        </div>
    );

    const applicationStatusBadge = (status) => {
        const map = {
            approved: "bg-green-100 text-green-700",
            rejected: "bg-red-100 text-red-700",
            pending: "bg-yellow-100 text-yellow-700",
        };
        const style = map[status] || "bg-gray-100 text-gray-600";
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
                {status}
            </span>
        );
    };

    const workStatusBadge = (status) => {
        const map = {
            available: "bg-blue-100 text-blue-700",
            in_delivery: "bg-purple-100 text-purple-700",
        };
        const style = map[status] || "bg-gray-100 text-gray-600";
        const label = status ? status.replace("_", " ") : "—";
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
                {label}
            </span>
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Riders Pending Approval
                </h2>
                <p className="text-sm text-gray-400">
                    {riders.length} rider{riders.length !== 1 && "s"} total
                </p>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-lime-400"></span>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && riders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-2xl border border-base-200">
                    <FaUserClock className="text-5xl text-gray-300 mb-4" />
                    <p className="text-gray-500">No riders pending approval.</p>
                </div>
            )}

            {/* Table */}
            {!isLoading && riders.length > 0 && (
                <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="py-4">#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Districts</th>
                                <th>Application Status</th>
                                <th>Work Status</th>
                                <th className="text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riders.map((rider, index) => {
                                const modalId = `rider_modal_${rider._id}`;
                                return (
                                    <tr
                                        key={rider._id}
                                        className="hover:bg-gray-50 transition-colors border-b border-base-200 last:border-none"
                                    >
                                        <th className="text-gray-400 font-normal">
                                            {index + 1}
                                        </th>
                                        <td className="font-medium text-gray-700">
                                            {rider.name}
                                        </td>
                                        <td className="text-gray-500 text-sm">
                                            {rider.email}
                                        </td>
                                        <td className="text-gray-600">
                                            {rider.district}
                                        </td>
                                        <td>
                                            {applicationStatusBadge(rider.status)}
                                        </td>
                                        <td>{workStatusBadge(rider.workStatus)}</td>
                                        <td>
                                            <div className="flex gap-2 justify-end pr-2">
                                                <button
                                                    className="btn btn-square btn-sm bg-gray-50 hover:bg-lime-100 border border-base-200"
                                                    aria-label="View rider"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(modalId)
                                                            .showModal()
                                                    }
                                                >
                                                    <FaEye className="text-gray-600" />
                                                </button>
                                                <dialog id={modalId} className="modal">
                                                    <div className="modal-box max-w-md">
                                                        <h3 className="font-bold text-xl mb-4">
                                                            Rider Info
                                                        </h3>
                                                        <div className="bg-base-200 rounded-xl p-4 space-y-3">
                                                            <InfoRow
                                                                label="Name"
                                                                value={rider?.name}
                                                            />
                                                            <InfoRow
                                                                label="Phone"
                                                                value={rider?.phone}
                                                            />
                                                            <InfoRow
                                                                label="Email"
                                                                value={rider?.email}
                                                            />
                                                            <InfoRow
                                                                label="District"
                                                                value={rider?.district}
                                                            />
                                                        </div>
                                                    </div>
                                                    <form
                                                        method="dialog"
                                                        className="modal-backdrop"
                                                    >
                                                        <button>close</button>
                                                    </form>
                                                </dialog>
                                                <button
                                                    onClick={() =>
                                                        handleApproval(rider)
                                                    }
                                                    className="btn btn-square btn-sm bg-gray-50 hover:bg-green-100 border border-base-200"
                                                    aria-label="Approve rider"
                                                >
                                                    <FaUserCheck className="text-green-600" />
                                                </button>
                                                <button
                                                    className="btn btn-square btn-sm bg-gray-50 hover:bg-yellow-100 border border-base-200"
                                                    onClick={() =>
                                                        handleRejection(rider)
                                                    }
                                                    aria-label="Reject rider"
                                                >
                                                    <IoPersonRemoveSharp className="text-yellow-600" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteRider(rider._id)
                                                    }
                                                    className="btn btn-square btn-sm bg-gray-50 hover:bg-red-100 border border-base-200"
                                                    aria-label="Delete rider"
                                                >
                                                    <FaTrash className="text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApproveRiders;