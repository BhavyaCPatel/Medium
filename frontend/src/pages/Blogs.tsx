import { useEffect } from 'react';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useBlogs } from '../hooks';
import { toast } from 'react-toastify';


export const Blogs = () => {
    const { loading, blogs, error } = useBlogs();

    useEffect(() => {
        if (error) {
            console.log("Triggering toast for error:", error);
            toast.error(error)
        }
    }, [error]);

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <Appbar />
            <div className='flex justify-center mt-2'>
                <div className=''>
                    {blogs.map((blog) => {
                        const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        return <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || 'Anonymous'}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={formattedDate}
                        />
                    })}
                </div>
            </div>
        </div>
    );
};
