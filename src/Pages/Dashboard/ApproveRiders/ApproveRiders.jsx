import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaTrash, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: riders = [] } = useQuery({
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
            confirmButtonColor: "#3085d6",
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

    return (
        <div>
            <div className="text-5xl">
                Riders pending Approval {riders.length}
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Districts</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>
                                <td>
                                    {
                                        <p
                                            className={`${rider.status === "approved" ? "text-green-800" : "text-blue-500"} ${rider.status === "rejected" ? "text-red-500" : "text-blue-500"} `}>
                                            {rider.status}
                                        </p>
                                    }
                                </td>
                                <td>{rider.workStatus}</td>

                                <td>
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button
                                        className="btn"
                                        onClick={() =>
                                            document
                                                .getElementById("my_modal_2")
                                                .showModal()
                                        }>
                                        <FaEye></FaEye>
                                    </button>
                                    <dialog id="my_modal_2" className="modal">
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
                                                    label="district"
                                                    value={rider?.district}
                                                />
                                            </div>
                                        </div>
                                        <form
                                            method="dialog"
                                            className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                    <button
                                        onClick={() => handleApproval(rider)}
                                        className="btn">
                                        <FaUserCheck></FaUserCheck>
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => handleRejection(rider)}>
                                        <IoPersonRemoveSharp></IoPersonRemoveSharp>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteRider(rider._id)
                                        }
                                        className="btn">
                                        <FaTrash></FaTrash>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;
