import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "author": {
        "name": string
    }
    "createdAt": string;
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/${id}`, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            }).catch(e => {
                if (axios.isAxiosError(e) && e.response) {
                    console.log(e.response.data);
                    setError(e.response.data.message);
                }
            })
    }, [id])

    return {
        loading,
        blog,
        error
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/bulk`, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log("blog:", response.data.blog)
                setBlogs(response.data.blog);
                setLoading(false);
            }).catch(e => {
                if (axios.isAxiosError(e) && e.response) {
                    console.log(e.response.data.message);
                    setError(e.response.data.message);
                }
            })
    }, [])

    return {
        loading,
        blogs,
        error
    }
}