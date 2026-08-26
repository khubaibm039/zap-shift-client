import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router";

const ResetPassword = () => {
    const { resetPassword } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        setMessage("");
        setError("");

        resetPassword(data.email)
            .then(() => {
                setMessage(
                    "Reset link sent! Check your inbox (and spam folder).",
                );
            })
            .catch((err) => {
                setError(
                    "Something went wrong. Please check the email and try again.",
                );
                console.log(err);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-1">
                        Reset Password
                    </h2>
                    <p className="text-center text-sm text-base-content/60 mb-4">
                        Enter your email and we&apos;ll send you a reset link
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Email
                                </span>
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className={`input input-bordered w-full ${
                                    errors.email ? "input-error" : ""
                                }`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                            />
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.email.message}
                                    </span>
                                </label>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Sending...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </form>

                    {message && (
                        <div
                            role="alert"
                            className="alert alert-success mt-4 text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>{message}</span>
                        </div>
                    )}

                    {error && (
                        <div
                            role="alert"
                            className="alert alert-error mt-4 text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <p className="text-center text-sm mt-4">
                        Remembered your password?{" "}
                        <Link
                            to="/login"
                            className="link link-primary font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
