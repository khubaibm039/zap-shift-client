import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaUserCheck } from "react-icons/fa";
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
                            <th>Status</th>
                            <th>Action</th>
                            <th>Districts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr>
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
                                <td>
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
