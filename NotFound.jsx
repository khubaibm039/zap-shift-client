import { Link } from "react-router";
import notFoundImage from "/src/assets/notfound.png";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-20 bg-white">
            <img
                src={notFoundImage}
                alt="Page not found"
                className="w-56 md:w-64 mb-6"
            />

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                Error 404
            </h1>
            <Link
                to="/"
                className="btn bg-primary hover:bg-primary/90 border-none text-black font-semibold px-8">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
