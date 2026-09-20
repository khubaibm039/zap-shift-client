import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    });
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [sessionId, axiosSecure]);

    const copyToClipboard = (text) => {
        if (text) navigator.clipboard.writeText(text);
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-lime-400"></span>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center bg-base-100 rounded-2xl shadow-xl p-8 border border-base-200">
                {/* Icon */}
                <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Successful
                </h1>
                <p className="text-gray-500 mb-6">
                    Thank you! Your payment has been processed and your parcel
                    is scheduled for pickup.
                </p>

                {/* Details */}
                <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                            Transaction ID
                        </p>
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-gray-700 break-all">
                                {paymentInfo.transactionId || "—"}
                            </p>
                            <button
                                onClick={() =>
                                    copyToClipboard(paymentInfo.transactionId)
                                }
                                className="btn btn-ghost btn-xs shrink-0"
                                aria-label="Copy transaction ID">
                                Copy
                            </button>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                            Parcel Tracking ID
                        </p>
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-gray-700 break-all">
                                {paymentInfo.trackingId || "—"}
                            </p>
                            <button
                                onClick={() =>
                                    copyToClipboard(paymentInfo.trackingId)
                                }
                                className="btn btn-ghost btn-xs shrink-0"
                                aria-label="Copy tracking ID">
                                Copy
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        to="/dashboard/my-parcels"
                        className="btn flex-1 bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold">
                        Track Parcel
                    </Link>
                    <Link
                        to="/dashboard"
                        className="btn flex-1 btn-outline border-gray-300 text-gray-600 hover:bg-gray-100">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
