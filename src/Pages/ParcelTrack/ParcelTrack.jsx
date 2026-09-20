// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router";
// import useAxios from "../../Hooks/useAxios";

// const ParcelTrack = () => {
//     const { trackingId } = useParams();
//     const axiosInstance = useAxios();
//     const { data: trackings = [] } = useQuery({
//         queryKey: ["tracing", trackingId],
//         queryFn: async () => {
//             const res = await axiosInstance.get(
//                 `/trackings/${trackingId}/logs`,
//             );
//             return res.data;
//         },
//     });
//     return (
//         <div className="p-10">
//             <h2 className="text-4xl">Track your Package : {trackingId}</h2>
//             <p>Logs so far {trackings.length}</p>
//             <ul className="timeline timeline-vertical">
//                 {trackings.map((log) => (
//                     <li key={log._id}>
//                         <div className="timeline-start">
//                             {new Date(log.createAt).toLocaleString()}
//                         </div>
//                         <div className="timeline-middle">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                                 className="h-5 w-5">
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </div>
//                         <div className="timeline-end timeline-box">
//                             <span className="text-xl"> {log.details}</span>
//                         </div>
//                         <hr />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ParcelTrack;
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const ParcelTrack = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();
    const { data: trackings = [], isLoading } = useQuery({
        queryKey: ["tracing", trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/trackings/${trackingId}/logs`,
            );
            return res.data;
        },
    });

    // Color + icon per status, with sensible fallbacks for unknown statuses
    const statusStyle = (details = "") => {
        const key = details.toLowerCase();
        if (key.includes("delivered"))
            return {
                dot: "bg-green-500",
                text: "text-green-700",
                bg: "bg-green-50",
            };
        if (key.includes("pending") || key.includes("pickup"))
            return {
                dot: "bg-yellow-500",
                text: "text-yellow-700",
                bg: "bg-yellow-50",
            };
        if (key.includes("cancel"))
            return { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50" };
        if (key.includes("created"))
            return {
                dot: "bg-blue-500",
                text: "text-blue-700",
                bg: "bg-blue-50",
            };
        return { dot: "bg-lime-500", text: "text-gray-700", bg: "bg-gray-50" };
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                    Track your Package
                </h2>
                <p className="text-sm font-mono text-gray-500 mt-1">
                    {trackingId}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    {trackings.length} log{trackings.length !== 1 && "s"} so far
                </p>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-lime-400"></span>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && trackings.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-base-100 rounded-2xl border border-base-200">
                    <p className="text-gray-500">No tracking updates yet.</p>
                </div>
            )}

            {/* Timeline */}
            {!isLoading && trackings.length > 0 && (
                <ol className="relative border-l-2 border-gray-200 ml-3">
                    {trackings.map((log) => {
                        const style = statusStyle(log.details);
                        return (
                            <li key={log._id} className="mb-6 ml-6">
                                <span
                                    className={`absolute -left-2.25 flex items-center justify-center w-4 h-4 rounded-full ring-4 ring-white ${style.dot}`}></span>
                                <div
                                    className={`p-4 rounded-xl border border-base-200 ${style.bg}`}>
                                    <p
                                        className={`font-semibold capitalize ${style.text}`}>
                                        {log.details}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(
                                            log.createAt,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            )}
        </div>
    );
};

export default ParcelTrack;
