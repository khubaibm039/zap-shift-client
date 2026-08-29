import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Swal from "sweetalert2";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
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
            confirmButtonColor: "#3085d6",
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
        };
        const res = await axiosSecure.post(
            "/create-checkout-session",
            paymentInfo,
        );
        if (res.data?.url) {
            window.location.assign(res.data.url);
        }
    };

    return (
        <div>
            <h2>all parcels {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment </th>
                            <th>Tracking Id </th>
                            <th>Delivery Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.price}</td>
                                <td>
                                    {parcel.paymentStatus === "paid" ? (
                                        <span className="text-green-700 ">
                                            paid
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handlePayment(parcel)
                                            }
                                            className="btn-primary text-black btn btn-sm">
                                            Pay
                                        </button>
                                    )}
                                    
                                </td>
                                <td>{parcel.trackingId}</td>
                                <td>{parcel.deliveryStatus}</td>
                                <td className="flex gap-4">
                                    <button className="btn btn-square hover:bg-primary">
                                        <FaRegEdit></FaRegEdit>
                                    </button>
                                    <button className="btn btn-square hover:bg-primary">
                                        <HiMiniMagnifyingGlass />
                                    </button>
                                    <button
                                        className="btn btn-square hover:bg-primary"
                                        onClick={() =>
                                            handleParcelDelete(parcel._id)
                                        }>
                                        <FaTrash />
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

export default MyParcels;
