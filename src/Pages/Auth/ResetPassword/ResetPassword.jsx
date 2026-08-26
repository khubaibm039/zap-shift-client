import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ResetPassword = () => {

    const navigate = useNavigate();
    const { resetPassword } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        resetPassword(data.email)
            .then(() => {
                toast.success(
                    "Reset link sent! Check your inbox (and spam folder)",
                );
                navigate("/login");
            })
            .catch(() => {
                toast.error(
                    "Something went wrong. Please check the email and try again.",
                );
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card w-full max-w-md bg-base-100">
                <div className="card-body">
                    <h2 className="text-5xl font-extrabold mb-1">
                        Forgot Password
                    </h2>
                    <p className="mb-4">
                        Enter your email address and we’ll send you a reset
                        link.
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
                            className="btn btn-primary text-secondary w-full"
                            disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Sending...
                                </>
                            ) : (
                                "Send"
                            )}
                        </button>
                    </form>
                    <p className="mt-4">
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
