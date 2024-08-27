import React, { useState } from 'react';

interface ScamAlertMessageProps {
    searchedContact: any;
    BASE_API_URL: string;
}

const ScamAlertMessage: React.FC<ScamAlertMessageProps> = ({ searchedContact, BASE_API_URL }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="bg-white text-gray-700 p-4 shadow-md my-4" role="alert">
            <div className="flex items-center bg-red-500 text-white p-3 shadow-md mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <strong className="font-bold text-lg uppercase">Scam Alert!</strong>
            </div>
            <span className="block sm:inline mt-2">
                The phone number is reported and identified as a scam.
            </span>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 border p-2 items-center">
                <div>
                    <div><strong>Contact Identifier:</strong> {searchedContact.contactIdentifier}</div>
                    <div><strong>Number of Searches:</strong> {searchedContact.searchCount}</div>
                    {searchedContact.lastSearchDate && (
                        <div><strong>Last Searched Date:</strong> {new Date(searchedContact.lastSearchDate).toLocaleDateString()}</div>
                    )}
                    <div><strong>Number Of Reports:</strong> {searchedContact.reportedCount}</div>
                    {searchedContact.lastReportDate && (
                        <div><strong>Last Reported Date:</strong> {new Date(searchedContact.lastReportDate).toLocaleDateString()}</div>
                    )}
                    {searchedContact.lastDetails && (
                        <div><strong>Last Reported Details:</strong> {searchedContact.lastDetails}</div>
                    )}
                    {searchedContact.lastFlag && (
                        <div><strong>Severity:</strong> {searchedContact.lastFlag}</div>
                    )}
                </div>
                {searchedContact.lastScreenshot && (
                    <div className="mt-2 flex flex-col items-center">
                        <strong>Screenshot:</strong>
                        <img
                            src={`${BASE_API_URL}storage/${searchedContact.lastScreenshot}`}
                            alt="screenshot"
                            className="mt-1 border rounded-lg cursor-pointer h-48 object-cover"
                            onClick={openModal}
                        />
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full max-h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Screenshot</h2>
                            <button className="text-gray-500 text-3xl " onClick={closeModal}>
                                &times;
                            </button>
                        </div>
                        <img
                            src={`${BASE_API_URL}storage/${searchedContact.lastScreenshot}`}
                            alt="screenshot"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScamAlertMessage;
