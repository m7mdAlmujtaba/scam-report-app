const NotScamCard = () => {
    return (
        <div className="container mx-auto px-2 md:px-40 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between relative w-full bg-white shadow-2xl rounded-lg pb-8 pt-4 px-4 md:px-8">
                <div className="w-full md:w-8/12 text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-yellow-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>

                    <span className="flex">
                        If your number is mistakenly listed as a scam, you can report it as "Not a Scam."
                    </span>
                </div>
                <div className="relative shadow-md font-medium my-5 py-2 px-4 text-white cursor-pointer bg-yellow-600 hover:bg-yellow-500 rounded text-lg text-center w-48">
                    <span className="absolute h-3 w-3 right-0 top-0 animate-ping inline-flex rounded-full bg-yellow-600"></span>
                    Not a Scam
                </div>
            </div>
        </div>
    );
}

export default NotScamCard;