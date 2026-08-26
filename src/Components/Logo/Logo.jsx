import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = () => {
    return (
        <div>
            <Link to="/">
                <div className="flex items-end ">
                    <img src={logo} alt="Logo" />
                    <h3 className="text-2xl font-bold -ms-2.5">ZapShift</h3>
                </div>
            </Link>
        </div>
    );
};

export default Logo;
