import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["parcels", user.email, "driver_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
            );
            return res.data;
        },
    });
    const handleDeliveryStatusUpdate = (parcel, status) => {
        const statusInfo = { deliveryStatus: status };
        let massage = `parcel status is updated with ${status.split('_').join(' ')}`
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
        <div>
            <h2 className="font-black text-5xl">
                this is the page where rider can accept or reject the ride
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parcel Name</th>
                            <th>Confirm</th>
                            <th>Other Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => (
                            <tr key={parcel._id}>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>
                                    {parcel.deliveryStatus ===
                                    "driver_assigned" ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleDeliveryStatusUpdate(
                                                        parcel,
                                                        "rider_arriving",
                                                    )
                                                }
                                                className="btn btn-soft btn-primary text-black mr-2">
                                                Accept
                                            </button>
                                            <button className="btn btn-warning text-black">
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-green-500">
                                            Accepted
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDeliveryStatusUpdate(
                                                parcel,
                                                "parcel_picked_up",
                                            )
                                        }
                                        className="btn btn-soft btn-accent btn-ghost mr-2">
                                        Mark as picked up
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeliveryStatusUpdate(
                                                parcel,
                                                "parcel_delivered",
                                            )
                                        }
                                        className="btn btn-soft btn-ghost btn-info">
                                        Mark as delivered
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* row 1 */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;
