import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'

export const Appbar = () => {

    const token = localStorage.getItem("token");
    let name = 'Anonymous';
    if (token) {
        const decoded = jwtDecode<{ name: string }>(token);
        name = decoded.name;
    } else {
        console.log("No token found in localStorage.");
    }

    return <div className="border-b flex justify-between px-10 py-3">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-serif text-2xl font-medium">
            Medium
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ">New</button>
            </Link>

            <Avatar size={"big"} name={name || 'Anonymous'} />
        </div>
    </div>
}