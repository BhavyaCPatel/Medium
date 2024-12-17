export const FullBlogSkeleton = () => {
    return <div role="status" className="animate-pulse">
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8 mb-10">
                    <div className="text-5xl font-extrabold bg-gray-200 h-6 mb-3"></div>
                    <div className="text-slate-500 pt-2 bg-gray-200 mb-8"></div>
                    <div className="pt-4 text-lg leading-relaxed bg-gray-200 h-48" />
                </div>
                <div className="col-span-4 bg-gray-200 mx-4 rounded-md h-14">
                    <div className="text-slate-600 text-lg"></div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center bg-gray-200 h-4 w-4 rounded-full"></div>
                        <div>
                            <div className="pt-1 text-xl capitalize font-bold bg-gray-200"></div>
                            <div className="text-slate-500 text-lg bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <span className="sr-only">Loading...</span>
    </div>
}
