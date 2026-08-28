import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('')

    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users",searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
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
            confirmButtonColor: "#3085d6",
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

    return (
        <div>
            <h1 className="text-4xl">Manage User : {users.length}</h1>
           
            <label className="input">
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
                    onChange={(e)=> setSearchText(e.target.value)}
                    type="search" 
                    className="grow" 
                    placeholder="Search" />
                <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
            </label>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>{user.displayName}</div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">
                                        {user.email}
                                    </span>
                                </td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role === "admin" ? (
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() =>
                                                handleRemoveAdmin(user)
                                            }>
                                            <FaUserSlash /> Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() =>
                                                handleMakeAdmin(user)
                                            }>
                                            <FaUserShield /> Make Admin
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">
                                        details
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

export default UsersManagement;
