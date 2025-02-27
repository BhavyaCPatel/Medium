import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInputs } from "@bhavyapatel/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from 'react-toastify';
import { Spinner } from "./Spinner";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInputs>({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt_token = response.data.jwt;
            localStorage.setItem("token", jwt_token);
            toast.success("Signed up successfully!!")
            setTimeout(() => {
                if (type === "signin") {
                    navigate("/blogs");
                } else {
                    navigate("/");
                }
            }, 1500);
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response) {
                console.log(e.response.data.error);
                if (type === "signin") {
                    toast.error(e.response.data.error)
                } else {
                    toast.error(e.response.data.error)
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="ABC XYZ..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="abc@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={showPassword ? "text" : "password"} placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <div>
                        <input type="checkbox" onClick={toggleShowPassword} /> Show Password
                    </div>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>

        {loading && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                    <Spinner />
                </div>
            )}
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInputType) => {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
