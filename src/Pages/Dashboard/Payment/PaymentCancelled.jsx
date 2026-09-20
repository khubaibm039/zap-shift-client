import { Link } from "react-router";

const PaymentCancelled = () => {

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-base-100 rounded-2xl shadow-xl p-8 border border-base-200">
        {/* Icon */}
        <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mb-8">
          Your payment was not completed. Don&apos;t worry, no amount has
          been charged. You can try again whenever you&apos;re ready.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to={"/dashboard/my-parcels"}
           
            className="btn flex-1 bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold"
          >
            Try Again
          </Link>

        </div>

        {/* Support note */}
        <p className="text-xs text-gray-400 mt-6">
          Having trouble?{" "}
          <a href="mailto:support@zapshift.com" className="underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;