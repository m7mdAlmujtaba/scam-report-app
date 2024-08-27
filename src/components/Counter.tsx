import React from 'react';

interface CounterProps {
  statistics: {
    reportedContactsCount: {
      [key: string]: number;
    };
    scamIdentifiersCount: number;
    searchCount: number;
  };
}

const Counter: React.FC<CounterProps> = ({ statistics }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-2 gap-2 md:gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">

        {/* Reported Numbers Card */}
        <div className="relative bg-white py-6 px-6 rounded w-full md:w-64 my-4 shadow-xl">
          <div className="text-white flex items-center absolute rounded py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
            </svg>

          </div>
          <div className="mt-8">
            <p className="text-sm font-bold my-2 uppercase">Reported Numbers</p>
            <div className="text-xl md:text-3xl font-bold md:font-extrabold">{statistics?.reportedContactsCount['Phone Number'] ?? 0}</div>
          </div>
        </div>

        {/* Reported Emails Card */}
        <div className="relative bg-white py-6 px-6 rounded w-full md:w-64 my-4 shadow-xl">
          <div className="text-white flex items-center absolute rounded py-4 px-4 shadow-xl bg-green-500 left-4 -top-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
            </svg>


          </div>
          <div className="mt-8">
            <p className="text-sm font-bold my-2 uppercase">Reported Emails</p>
            <div className="text-xl md:text-3xl font-bold md:font-extrabold">{statistics?.reportedContactsCount['Email'] ?? 0}</div>
          </div>
        </div>

        {/* Scam Numbers Card */}
        <div className="relative bg-white py-6 px-6 rounded w-full md:w-64 my-4 shadow-xl">
          <div className="text-white flex items-center absolute rounded py-4 px-4 shadow-xl bg-yellow-500 left-4 -top-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>

          </div>
          <div className="mt-8">
            <p className="text-sm font-bold my-2 uppercase">Scam Numbers</p>
            <div className="text-xl md:text-3xl font-bold md:font-extrabold">{statistics?.scamIdentifiersCount ?? 0}</div>
          </div>
        </div>

        {/* Search Number Attempts Card */}
        <div className="relative bg-white py-6 px-6 rounded w-full md:w-64 my-4 shadow-xl">
          <div className="text-white flex items-center absolute rounded py-4 px-4 shadow-xl bg-blue-500 left-4 -top-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>

          </div>
          <div className="mt-8">
            <p className="text-sm font-bold my-2 uppercase">Search Number Attempts</p>
            <div className="text-xl md:text-3xl font-bold md:font-extrabold">{statistics?.searchCount ?? 0}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Counter;
