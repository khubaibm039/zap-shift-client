import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, isError, data: parcel } = useQuery({
        queryKey: ["parcels", parcelId],
        enabled: !!parcelId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    });
   
    const handlePayment = async () => {
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
        if (res.data.url) {
            window.location.href = res.data.url;
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-ring loading-xl "></span>
            </div>
        );
    }

    if (isError || !parcel) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-error">Could not load parcel details.</p>
            </div>
        );
    }

    return (
        <div>
            <h3>
                Please pay ${parcel.price} for: {parcel.parcelName}
            </h3>
            <button
                onClick={handlePayment}
                className="btn btn-primary text-black">
                Pay
            </button>
        </div>
    );
};

export default Payment;