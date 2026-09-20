// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { FaUserShield, FaUserSlash } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const UsersManagement = () => {
//     const axiosSecure = useAxiosSecure();
//     const [searchText, setSearchText] = useState('')

//     const { refetch, data: users = [] } = useQuery({
//         queryKey: ["users",searchText],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users?searchText=${searchText}`);
//             return res.data;
//         },
//     });
//     const handleMakeAdmin = (user) => {
//         const roleInfo = { role: "admin" };
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Confirm!",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure
//                     .patch(`/users/${user._id}/role`, roleInfo)
//                     .then((res) => {
//                         if (res.data.modifiedCount) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Confirmed!",
//                                 text: `${user.displayName} Marked as Admin.`,
//                                 icon: "success",
//                                 timer: 2500,
//                             });
//                         }
//                     });
//             }
//         });
//     };
//     const handleRemoveAdmin = (user) => {
//         const roleInfo = { role: "user" };
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, Remove it!",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure
//                     .patch(`/users/${user._id}/role`, roleInfo)
//                     .then((res) => {
//                         if (res.data.modifiedCount) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Confirmed!",
//                                 text: `${user.displayName} Remove From admin.`,
//                                 icon: "success",
//                                 timer: 2500,
//                             });
//                         }
//                     });
//             }
//         });
//     };

//     return (
//         <div  className="max-w-6xl mx-auto">
//             <h1 className="text-4xl">Manage User : {users.length}</h1>

//             <label className="input">
//                 <svg
//                     className="h-[1em] opacity-50"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24">
//                     <g
//                         strokeLinejoin="round"
//                         strokeLinecap="round"
//                         strokeWidth="2.5"
//                         fill="none"
//                         stroke="currentColor">
//                         <circle cx="11" cy="11" r="8"></circle>
//                         <path d="m21 21-4.3-4.3"></path>
//                     </g>
//                 </svg>
//                 <input
//                     onChange={(e)=> setSearchText(e.target.value)}
//                     type="search"
//                     className="grow"
//                     placeholder="Search" />
//                 <kbd className="kbd kbd-sm">⌘</kbd>
//                 <kbd className="kbd kbd-sm">K</kbd>
//             </label>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Admin Action</th>
//                             <th>Others Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     <div className="flex items-center gap-3">
//                                         <div className="avatar">
//                                             <div className="mask mask-squircle h-12 w-12">
//                                                 <img
//                                                     src={user.photoURL}
//                                                     alt="Avatar Tailwind CSS Component"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div>{user.displayName}</div>
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <span className="badge badge-ghost badge-sm">
//                                         {user.email}
//                                     </span>
//                                 </td>
//                                 <td>{user.role}</td>
//                                 <td>
//                                     {user.role === "admin" ? (
//                                         <button
//                                             className="btn btn-sm btn-error"
//                                             onClick={() =>
//                                                 handleRemoveAdmin(user)
//                                             }>
//                                             <FaUserSlash /> Remove Admin
//                                         </button>
//                                     ) : (
//                                         <button
//                                             className="btn btn-sm btn-success"
//                                             onClick={() =>
//                                                 handleMakeAdmin(user)
//                                             }>
//                                             <FaUserShield /> Make Admin
//                                         </button>
//                                     )}
//                                 </td>
//                                 <td>
//                                     <button className="btn btn-ghost btn-xs">
//                                         details
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UsersManagement;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield, FaUserSlash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");

    const {
        refetch,
        data: users = [],
        isLoading,
    } = useQuery({
        queryKey: ["users", searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users?searchText=${searchText}`,
            );
            return res.data;
        },
    });

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: "admin" };
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#84cc16",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/${user._id}/role`, roleInfo)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: "Confirmed!",
                                text: `${user.displayName} Marked as Admin.`,
                                icon: "success",
                                timer: 2500,
                            });
                        }
                    });
            }
        });
    };

    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: "user" };
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/${user._id}/role`, roleInfo)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: "Confirmed!",
                                text: `${user.displayName} Remove From admin.`,
                                icon: "success",
                                timer: 2500,
                            });
                        }
                    });
            }
        });
    };

    const roleBadge = (role) => {
        const map = {
            admin: "bg-purple-100 text-purple-700",
            rider: "bg-blue-100 text-blue-700",
            user: "bg-gray-100 text-gray-600",
        };
        const style = map[role] || "bg-gray-100 text-gray-600";
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
                {role}
            </span>
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Manage Users
                </h2>
                <p className="text-sm text-gray-400">
                    {users.length} user{users.length !== 1 && "s"} total
                </p>
            </div>

            {/* Search */}
            <label className="input flex items-center gap-2 mb-6 bg-base-100 border border-base-200 rounded-full px-4 max-w-sm focus-within:border-lime-400">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    className="grow"
                    placeholder="Search by name or email"
                />
            </label>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-lime-400"></span>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && users.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-2xl border border-base-200">
                    <FaUsers className="text-5xl text-gray-300 mb-4" />
                    <p className="text-gray-500">No users found.</p>
                </div>
            )}

            {/* Table */}
            {!isLoading && users.length > 0 && (
                <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="py-4">#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Admin Action</th>
                                <th className="text-right pr-6">
                                    Other Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-gray-50 transition-colors border-b border-base-200 last:border-none">
                                    <td className="text-gray-400">
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-10 w-10">
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user.displayName}
                                                    />
                                                </div>
                                            </div>
                                            <span className="font-medium text-gray-700">
                                                {user.displayName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-gray-500 text-sm">
                                        {user.email}
                                    </td>
                                    <td>{roleBadge(user.role)}</td>
                                    <td>
                                        {user.role === "admin" ? (
                                            <button
                                                className="btn btn-sm bg-red-50 hover:bg-red-100 text-red-600 border-none"
                                                onClick={() =>
                                                    handleRemoveAdmin(user)
                                                }>
                                                <FaUserSlash /> Remove Admin
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-sm bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold"
                                                onClick={() =>
                                                    handleMakeAdmin(user)
                                                }>
                                                <FaUserShield /> Make Admin
                                            </button>
                                        )}
                                    </td>
                                    <td className="text-right pr-2">
                                        <button className="btn btn-ghost btn-xs text-gray-500">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UsersManagement;
