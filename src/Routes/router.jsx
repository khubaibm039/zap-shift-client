import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import About from "../Pages/About/About";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import BeARider from "../Pages/BeARider/BeARider";
import PrivateRoutes from "./PrivateRoutes";
import ResetPassword from "../Pages/Auth/ResetPassword/ResetPassword";
import NotFound from "../../NotFound";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        HydrateFallback: () => null,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "/coverage",
                element: <Coverage></Coverage>,
                loader: () =>
                    fetch("/serviceCenters.json").then((res) => res.json()),
            },
            {
                path: "/about",
                element: <About></About>,
                loader: () => fetch("/about.json").then((res) => res.json()),
            },
            {
                path: "/send-parcel",
                element: (
                    <PrivateRoutes>
                        <SendParcel></SendParcel>
                    </PrivateRoutes>
                ),
                loader: () =>
                    fetch("/serviceCenters.json").then((res) => res.json()),
            },
            {
                path: "/rider",
                element: (
                    <PrivateRoutes>
                        <BeARider></BeARider>
                    </PrivateRoutes>
                ),
                loader: () =>
                    fetch("/serviceCenters.json").then((res) => res.json()),
            },

            {
                path: "*",
                element: <NotFound></NotFound>,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/forget-password",
                element: <ResetPassword></ResetPassword>,
            },
        ],
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoutes>
                <DashboardLayout></DashboardLayout>
            </PrivateRoutes>
        ),
        children: [
            {
                path: "my-parcels",
                element: <MyParcels></MyParcels>,
            },
            {
                path: "payment/:parcelId",
                element: <Payment></Payment>,
            },
            {
                path: "payment-success",
                element: <PaymentSuccess></PaymentSuccess>,
            },
            {
                path: "payment-cancelled",
                element: <PaymentCancelled></PaymentCancelled>,
            },
            {
                path: "payment-history",
                element: <PaymentHistory></PaymentHistory>,
            },
            //k admin only route
            {
                path: "approve-riders",
                element: (
                    <AdminRoute>
                        <ApproveRiders></ApproveRiders>
                    </AdminRoute>
                ),
            },
            {
                path: "users-management",
                element: (
                    <AdminRoute>
                        <UsersManagement></UsersManagement>
                    </AdminRoute>
                ),
            },
            {
                path: "assign-riders",
                element: (
                    <AdminRoute>
                        <AssignRiders></AssignRiders>
                    </AdminRoute>
                ),
            },
            //k rider only route
            {
                path: "assigned-deliveries",
                element: (
                    <RiderRoute>
                        <AssignedDeliveries></AssignedDeliveries>
                    </RiderRoute>
                ),
            },
            {
                path: "completed-deliveries",
                element: <RiderRoute>
                    <CompletedDeliveries></CompletedDeliveries>
                </RiderRoute>
            }
        ],
    },
]);
