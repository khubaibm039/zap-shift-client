import { Link } from "react-router";

const PaymentCancelled = () => {
    return (
        <div  className="max-w-6xl mx-auto">
            <h2 className="text-4xl">Payment Cancelled Please try again</h2>
            <Link to={"/dashboard/my-parcels"} className="btn btn-primary text-black">Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;