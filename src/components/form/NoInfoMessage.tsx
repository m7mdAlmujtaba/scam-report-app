import React from 'react';

interface NoInfoMessageProps {
    searchedContact: any;
}

const NoInfoMessage: React.FC<NoInfoMessageProps> = ({ searchedContact }) => (
    <div className="bg-white text-gray-700 p-4 shadow-md my-4" role="alert">
        <div className="flex items-center bg-yellow-500 text-white p-3 shadow-md mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <strong className="font-bold text-lg uppercase">No Information Available</strong>
        </div>
        <span className="block sm:inline mt-2">
            No information is available for this number at the moment. Be careful and ensure you verify the identity of unknown contacts.
        </span>
        <div className="mt-4">
            <div><strong>Contact Identifier:</strong> {searchedContact.contactIdentifier}</div>
            <div><strong>Number of Searches:</strong> {searchedContact.searchCount}</div>
            {searchedContact.lastSearchDate && (
                <div><strong>Last Searched Date:</strong> {new Date(searchedContact.lastSearchDate).toLocaleDateString()}</div>
            )}
        </div>
        <div className="flex flex-col items-center mt-4">
            <strong>If you have concerns, please report it as a scam for additional review.</strong>
            <button className="bg-red-400 font-bold text-white rounded py-2 px-4 uppercase text-sm mt-4">Report As Scam</button>
        </div>
    </div>
);

export default NoInfoMessage;
