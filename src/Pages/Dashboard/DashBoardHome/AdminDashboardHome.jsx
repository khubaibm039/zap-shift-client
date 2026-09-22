// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const AdminDashboardHome = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: deliverySates = [] } = useQuery({
//         queryKey: ["delivery-status-state"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/parcels/delivery-status/stats");
//             return res.data;
//         },
//     });
//     return (
//         <div>
//             <div className="stats shadow">
//                 {deliverySates.map((state) => (
//                     <div key={state._id} className="stat">
//                         <div className="stat-figure text-secondary">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 className="inline-block h-8 w-8 stroke-current">
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                             </svg>
//                         </div>
//                         <div className="stat-title">{state._id}</div>
//                         <div className="stat-value">{state.count}</div>
//                         <div className="stat-desc">Jan 1st - Feb 1st</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardHome;
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
    FaBoxOpen,
    FaTruckLoading,
    FaCheckCircle,
    FaMoneyBillWave,
    FaQuestionCircle,
} from "react-icons/fa";
import { Pie, PieChart, Sector, ResponsiveContainer, Tooltip } from "recharts";

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { data: deliveryStates = [], isLoading } = useQuery({
        queryKey: ["delivery-status-state"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels/delivery-status/stats");
            return res.data;
        },
    });

    // Icon + color per known status; falls back gracefully for anything unexpected
    const statusMeta = (id) => {
        const map = {
            "pending-pickup": {
                icon: <FaTruckLoading />,
                color: "text-yellow-500",
                bg: "bg-yellow-50",
                hex: "#eab308",
                label: "Pending Pickup",
            },
            parcel_paid: {
                icon: <FaMoneyBillWave />,
                color: "text-blue-500",
                bg: "bg-blue-50",
                hex: "#3b82f6",
                label: "Paid",
            },
            parcel_delivered: {
                icon: <FaCheckCircle />,
                color: "text-green-500",
                bg: "bg-green-50",
                hex: "#22c55e",
                label: "Delivered",
            },
        };
        return (
            map[id] || {
                icon: <FaQuestionCircle />,
                color: "text-gray-400",
                bg: "bg-gray-50",
                hex: "#9ca3af",
                label: id ? id.replace(/[_-]/g, " ") : "Unlabeled",
            }
        );
    };

    const total = deliveryStates.reduce((sum, s) => sum + (s.count || 0), 0);

    // Shape data for the pie chart from the same deliveryStates the cards use
    const chartData = deliveryStates.map((state) => {
        const meta = statusMeta(state._id);
        return { name: meta.label, value: state.count, fill: meta.hex };
    });

    const [activeIndex, setActiveIndex] = useState(0);

    // Custom "exploded" active slice with a label callout, adapted from Recharts'
    // active-shape example — trimmed to plain JS and wired to real data/colors.
    const renderActiveShape = (props) => {
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        } = props;
        const RADIAN = Math.PI / 180;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 24) * cos;
        const my = cy + (outerRadius + 24) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 18;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>
                <text
                    x={cx}
                    y={cy}
                    dy={6}
                    textAnchor="middle"
                    fill="#374151"
                    className="text-sm font-semibold">
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 10}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#374151"
                    className="text-xs font-medium">
                    {`${value} parcels`}
                </text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 10}
                    y={ey}
                    dy={16}
                    textAnchor={textAnchor}
                    fill="#9ca3af"
                    className="text-xs">
                    {`(${(percent * 100).toFixed(1)}%)`}
                </text>
            </g>
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                <p className="text-sm text-gray-400">
                    Current parcel counts by delivery status
                </p>
            </div>

            {isLoading && (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-lime-400"></span>
                </div>
            )}

            {!isLoading && deliveryStates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-2xl border border-base-200">
                    <FaBoxOpen className="text-5xl text-gray-300 mb-4" />
                    <p className="text-gray-500">No parcel data yet.</p>
                </div>
            )}

            {!isLoading && deliveryStates.length > 0 && (
                <>
                    {/* Stat cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {deliveryStates.map((state) => {
                            const meta = statusMeta(state._id);
                            return (
                                <div
                                    key={state._id || "unlabeled"}
                                    className="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-5">
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${meta.color} ${meta.bg}`}>
                                            {meta.icon}
                                        </div>
                                    </div>
                                    <p className="text-xs uppercase tracking-wide text-gray-400 mt-4">
                                        {meta.label}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-800 mt-1">
                                        {state.count}
                                    </p>
                                </div>
                            );
                        })}

                        {/* Total card */}
                        <div className="bg-lime-50 rounded-2xl border border-lime-200 shadow-sm p-5">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-lime-700 bg-lime-100">
                                <FaBoxOpen />
                            </div>
                            <p className="text-xs uppercase tracking-wide text-lime-700 mt-4">
                                Total Parcels
                            </p>
                            <p className="text-3xl font-bold text-lime-700 mt-1">
                                {total}
                            </p>
                        </div>
                    </div>

                    {/* Pie chart */}
                    <div className="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
                        <h3 className="font-semibold text-gray-700 mb-4">
                            Status Breakdown
                        </h3>
                        <div style={{ width: "100%", height: 380 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="55%"
                                        outerRadius="75%"
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        onMouseEnter={(_, index) =>
                                            setActiveIndex(index)
                                        }
                                    />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboardHome;
