import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export const Appbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    let name = "Anonymous";
    if (token) {
        const decoded = jwtDecode<{ name: string }>(token);
        name = decoded.name;
    } else {
        console.log("No token found in localStorage.");
    }

    const [showSignOut, setShowSignOut] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="border-b flex justify-between px-10 py-3">
            <Link
                to={"/blogs"}
                className="flex flex-col justify-center cursor-pointer font-serif text-2xl font-medium"
            >
                Medium
            </Link>
            <div className="relative">
                <Link to={`/publish`}>
                    <button
                        type="button"
                        className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2"
                    >
                        New
                    </button>
                </Link>
                <div
                    className="relative inline-block"
                    onClick={() => setShowSignOut((prev) => !prev)}
                >
                    <Avatar size={"big"} name={name || "Anonymous"} />
                    {showSignOut && (
                        <div className="absolute w-28 my-5 right-0 top-12 shadow-lg z-10 text-center">
                            <span>{name}</span>
                            <hr className="h-0.5 bg-slate-700 m-2" />
                            <button
                                onClick={handleSignOut}
                                className=" bg-red-500 hover:bg-red-600 text-white text-sm mb-2 px-4 py-2 rounded shadow-lg z-10"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
