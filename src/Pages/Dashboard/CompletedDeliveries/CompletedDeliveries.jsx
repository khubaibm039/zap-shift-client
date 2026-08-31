import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], } = useQuery({
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
    return (
        <div>
            <h2 className="text-5xl">completed deliveries : {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Pickup District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.createAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>{parcel.price}</td>
                                <td>{calculatePayout(parcel)}</td>
                                <td>{parcel.createAt}</td>
                                <td>
                                    <button className="btn btn-soft btn-info">Cash Out</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;
