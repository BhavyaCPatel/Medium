import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { TextEditor } from "../components/TextEditor";
import { toast } from "react-toastify";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    // Create a reference for the title input
    const titleInputRef = useRef<HTMLInputElement>(null);

    // Focus the title input field after component mount
    useEffect(() => {
        // Add a slight delay to ensure other components (like TextEditor) are rendered first
        const timeout = setTimeout(() => {
            if (titleInputRef.current) {
                titleInputRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timeout); // Cleanup timeout
    }, []);

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        ref={titleInputRef} // Attach the reference
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        type="text"
                        placeholder="Title..."
                        className="text-4xl font-bold w-full focus:outline-none mb-4"
                    />

                    <TextEditor
                        onChange={(content: string) => {
                            setDescription(content);
                        }}
                    />

                    <button
                        onClick={async () => {
                            console.log("onClick");
                            if (title.trim() === "" || description.trim() === "") {
                                toast.error("Title or Description cannot be empty");
                                return;
                            }
                            try {
                                const response = await axios.post(
                                    `${BACKEND_URL}/blog`,
                                    {
                                        title,
                                        content: description,
                                    },
                                    {
                                        headers: {
                                            Authorization: localStorage.getItem("token"),
                                        },
                                    }
                                );
                                navigate(`/blog/${response.data.id}`);
                            } catch (error) {
                                console.error("Error publishing post:", error);
                                toast.error("Failed to publish post");
                            }
                        }}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900"
                    >
                        Publish post
                    </button>

                </div>
            </div>
        </div>
    );
};
