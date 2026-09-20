import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { updateProfile, updatePassword } from "firebase/auth";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// If you already have a role hook (common in this stack), use it instead of the
// fallback below — it saves a network call. Adjust the import path as needed.
// import useUserRole from "../../../Hooks/useUserRole";
import Swal from "sweetalert2";
import { FaUser, FaMotorcycle, FaShieldAlt } from "react-icons/fa";

const DashboardSettings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [activeTab, setActiveTab] = useState("profile");

    // --- Role lookup -------------------------------------------------------
    // Swap this for your existing useUserRole hook if you have one.
    const { data: roleData } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data; // expects { role: "user" | "rider" | "admin" }
        },
    });
    const role = roleData?.role || "user";

    // --- Profile form state --------------------------------------------------
    const [profile, setProfile] = useState({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        phone: "",
    });
    const [savingProfile, setSavingProfile] = useState(false);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        try {
            // 1. Update Firebase Auth profile (name + photo)
            await updateProfile(user, {
                displayName: profile.displayName,
                photoURL: profile.photoURL,
            });
            // 2. Sync to your own DB (phone isn't a Firebase Auth field)
            await axiosSecure.patch(`/users/${user.email}`, {
                displayName: profile.displayName,
                photoURL: profile.photoURL,
                phone: profile.phone,
            });
            Swal.fire({
                title: "Profile updated!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                title: "Something went wrong",
                text: err.message,
                icon: "error",
            });
        } finally {
            setSavingProfile(false);
        }
    };

    // --- Password form state --------------------------------------------------
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirm: "",
    });
    const [savingPassword, setSavingPassword] = useState(false);

    const handlePasswordSave = async (e) => {
        e.preventDefault();
        if (passwords.newPassword.length < 6) {
            return Swal.fire({
                title: "Password too short",
                text: "Use at least 6 characters.",
                icon: "warning",
            });
        }
        if (passwords.newPassword !== passwords.confirm) {
            return Swal.fire({
                title: "Passwords don't match",
                icon: "warning",
            });
        }
        setSavingPassword(true);
        try {
            // Firebase requires a recent login for this — if it throws
            // auth/requires-recent-login, prompt the user to sign in again.
            await updatePassword(user, passwords.newPassword);
            setPasswords({ newPassword: "", confirm: "" });
            Swal.fire({
                title: "Password updated!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                title: "Couldn't update password",
                text:
                    err.code === "auth/requires-recent-login"
                        ? "Please sign out and sign in again, then retry."
                        : err.message,
                icon: "error",
            });
        } finally {
            setSavingPassword(false);
        }
    };

    // --- Rider settings state --------------------------------------------------
    const [riderSettings, setRiderSettings] = useState({
        workStatus: "available",
        payoutMethod: "bkash",
        payoutNumber: "",
    });
    const [savingRider, setSavingRider] = useState(false);

    const handleRiderSave = async (e) => {
        e.preventDefault();
        setSavingRider(true);
        try {
            await axiosSecure.patch(
                `/riders/${user.email}/settings`,
                riderSettings,
            );
            Swal.fire({
                title: "Rider settings saved!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                title: "Save failed",
                text: err.message,
                icon: "error",
            });
        } finally {
            setSavingRider(false);
        }
    };

    // --- Admin settings state --------------------------------------------------
    const [adminSettings, setAdminSettings] = useState({
        sameDistrictRate: 0.8,
        diffDistrictRate: 0.6,
        baseFee: 60,
        perKgRate: 20,
    });
    const [savingAdmin, setSavingAdmin] = useState(false);

    const handleAdminSave = async (e) => {
        e.preventDefault();
        setSavingAdmin(true);
        try {
            await axiosSecure.patch("/admin/settings", adminSettings);
            Swal.fire({
                title: "Site settings saved!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                title: "Save failed",
                text: err.message,
                icon: "error",
            });
        } finally {
            setSavingAdmin(false);
        }
    };

    const tabs = [
        { key: "profile", label: "Profile", icon: <FaUser /> },
        ...(role === "rider" || role === "admin"
            ? [{ key: "rider", label: "Rider", icon: <FaMotorcycle /> }]
            : []),
        ...(role === "admin"
            ? [{ key: "admin", label: "Admin", icon: <FaShieldAlt /> }]
            : []),
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
                <p className="text-sm text-gray-400">
                    Manage your profile and account preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="tabs tabs-boxed bg-base-100 border border-base-200 mb-6 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`tab gap-2 ${
                            activeTab === tab.key
                                ? "tab-active bg-lime-400! text-gray-900! font-semibold"
                                : "text-gray-500"
                        }`}>
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Profile tab */}
            {activeTab === "profile" && (
                <div className="space-y-6">
                    <form
                        onSubmit={handleProfileSave}
                        className="bg-base-100 rounded-2xl border border-base-200 p-6 space-y-4">
                        <h3 className="font-semibold text-gray-700">
                            Profile Information
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="mask mask-squircle h-16 w-16">
                                    <img
                                        src={
                                            profile.photoURL ||
                                            "https://i.ibb.co/2FsfXqM/avatar.png"
                                        }
                                        alt="avatar preview"
                                    />
                                </div>
                            </div>
                            <input
                                type="url"
                                name="photoURL"
                                value={profile.photoURL}
                                onChange={handleProfileChange}
                                placeholder="Photo URL"
                                className="input input-bordered flex-1"
                            />
                        </div>
                        <input
                            type="text"
                            name="displayName"
                            value={profile.displayName}
                            onChange={handleProfileChange}
                            placeholder="Full name"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            placeholder="Phone number"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="input input-bordered w-full bg-gray-50 text-gray-400"
                        />
                        <button
                            type="submit"
                            disabled={savingProfile}
                            className="btn bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold">
                            {savingProfile ? "Saving..." : "Save Profile"}
                        </button>
                    </form>

                    <form
                        onSubmit={handlePasswordSave}
                        className="bg-base-100 rounded-2xl border border-base-200 p-6 space-y-4">
                        <h3 className="font-semibold text-gray-700">
                            Change Password
                        </h3>
                        <input
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    newPassword: e.target.value,
                                })
                            }
                            placeholder="New password"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="password"
                            value={passwords.confirm}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    confirm: e.target.value,
                                })
                            }
                            placeholder="Confirm new password"
                            className="input input-bordered w-full"
                        />
                        <button
                            type="submit"
                            disabled={savingPassword}
                            className="btn btn-outline">
                            {savingPassword ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            )}

            {/* Rider tab */}
            {activeTab === "rider" && (
                <form
                    onSubmit={handleRiderSave}
                    className="bg-base-100 rounded-2xl border border-base-200 p-6 space-y-4">
                    <h3 className="font-semibold text-gray-700">
                        Rider Preferences
                    </h3>
                    <div>
                        <label className="text-sm text-gray-500 mb-1 block">
                            Availability
                        </label>
                        <select
                            value={riderSettings.workStatus}
                            onChange={(e) =>
                                setRiderSettings({
                                    ...riderSettings,
                                    workStatus: e.target.value,
                                })
                            }
                            className="select select-bordered w-full">
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500 mb-1 block">
                            Payout Method
                        </label>
                        <select
                            value={riderSettings.payoutMethod}
                            onChange={(e) =>
                                setRiderSettings({
                                    ...riderSettings,
                                    payoutMethod: e.target.value,
                                })
                            }
                            className="select select-bordered w-full">
                            <option value="bkash">bKash</option>
                            <option value="nagad">Nagad</option>
                            <option value="bank">Bank Transfer</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        value={riderSettings.payoutNumber}
                        onChange={(e) =>
                            setRiderSettings({
                                ...riderSettings,
                                payoutNumber: e.target.value,
                            })
                        }
                        placeholder="Account / mobile number"
                        className="input input-bordered w-full"
                    />
                    <button
                        type="submit"
                        disabled={savingRider}
                        className="btn bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold">
                        {savingRider ? "Saving..." : "Save Rider Settings"}
                    </button>
                </form>
            )}

            {/* Admin tab */}
            {activeTab === "admin" && (
                <form
                    onSubmit={handleAdminSave}
                    className="bg-base-100 rounded-2xl border border-base-200 p-6 space-y-4">
                    <h3 className="font-semibold text-gray-700">
                        Platform Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                                Same-district payout rate
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={adminSettings.sameDistrictRate}
                                onChange={(e) =>
                                    setAdminSettings({
                                        ...adminSettings,
                                        sameDistrictRate: parseFloat(
                                            e.target.value,
                                        ),
                                    })
                                }
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                                Cross-district payout rate
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={adminSettings.diffDistrictRate}
                                onChange={(e) =>
                                    setAdminSettings({
                                        ...adminSettings,
                                        diffDistrictRate: parseFloat(
                                            e.target.value,
                                        ),
                                    })
                                }
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                                Base delivery fee (৳)
                            </label>
                            <input
                                type="number"
                                value={adminSettings.baseFee}
                                onChange={(e) =>
                                    setAdminSettings({
                                        ...adminSettings,
                                        baseFee: parseFloat(e.target.value),
                                    })
                                }
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                                Rate per kg (৳)
                            </label>
                            <input
                                type="number"
                                value={adminSettings.perKgRate}
                                onChange={(e) =>
                                    setAdminSettings({
                                        ...adminSettings,
                                        perKgRate: parseFloat(e.target.value),
                                    })
                                }
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={savingAdmin}
                        className="btn bg-lime-400 hover:bg-lime-500 border-none text-gray-900 font-semibold">
                        {savingAdmin ? "Saving..." : "Save Platform Settings"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default DashboardSettings;
