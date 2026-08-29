import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels", user.email, "driver_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`);
            return res.data;
        },
    });
    const handleAcceptDelivery = parcel =>{

    }
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
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => (
                            <tr key={parcel._id}>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>
                                    <button onClick={()=> handleAcceptDelivery(parcel)} className="btn btn-primary text-black mr-2">Accept</button>
                                    <button className="btn btn-warning text-black">Reject</button>
                                </td>
                                <td>Blue</td>
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
