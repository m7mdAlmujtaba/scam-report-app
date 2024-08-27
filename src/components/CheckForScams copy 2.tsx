import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PhoneInput } from "react-international-phone";
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Import icons
import FormHeader from './form/FormHeader';
import ScamTypeSelector from './form/ScamTypeSelector';

interface CheckForScamsProps {
    searchIdentifierForm: any;
    searchContact: (data: any) => void;
    watchSearchIdentifierContactType: string;
    searchedContact: any;
    BASE_API_URL: string;
    isPhoneValid: (value: string) => boolean;
    isLoading: boolean;
}

const CheckForScams: React.FC<CheckForScamsProps> = ({
    searchIdentifierForm,
    searchContact,
    watchSearchIdentifierContactType,
    searchedContact,
    BASE_API_URL,
    isPhoneValid,
    isLoading,  // Destructure isLoading
}) => {
    const [showOutput, setShowOutput] = useState(true);

    return (
        <>
            <section className="py-20 bg-gray-100 bg-opacity-50">
                <div className='mx-auto container md:w-3/4 shadow-md'>
                    <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden border border-white-800 shadow-xl rounded  p-[2px]">
                        <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#818CF8_20deg,transparent_120deg)]"> </div>
                        <div className="mx-auto z-20 container shadow-md">
                            <FormHeader />
                            <div className="bg-white space-y-6">
                                <form onSubmit={searchIdentifierForm.handleSubmit(searchContact)}>
                                    {/* <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-black items-center">
                                        <h2 className="md:w-1/3 mx-auto max-w-sm font-bold">Scam Type</h2>
                                        <div className="flex md:w-2/3 mx-auto gap-5">
                                            <div>
                                                <label className='flex text-center items-center'>
                                                    <input
                                                        {...searchIdentifierForm.register('contact_type')}
                                                        type="radio"
                                                        name="contact_type"
                                                        value="Phone Number"
                                                        className="mr-2"
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-indigo-400 mx-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                    </svg>

                                                    Phone Number
                                                </label>

                                            </div>
                                            <div>
                                                <label className='flex text-center items-center'>
                                                    <input
                                                        {...searchIdentifierForm.register('contact_type')}
                                                        type="radio"
                                                        name="contact_type"
                                                        value="Email"
                                                        className="mr-2"
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-indigo-400 mx-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                    </svg>

                                                    Email
                                                </label>
                                            </div>
                                        </div>
                                    </div> */}

                                    <ScamTypeSelector searchIdentifierForm={searchIdentifierForm} />

                                    <hr />
                                    <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">

                                        <div className="w-full mx-auto md:inline-flex">
                                            <div className="w-full inline-flex">
                                                <div className="w-full">
                                                    {watchSearchIdentifierContactType === "Email" ? (
                                                        <input
                                                            {...searchIdentifierForm.register('contact_identifier', { required: true })}
                                                            type="email"
                                                            placeholder="Enter email"
                                                            className="w-full p-2 border "
                                                            aria-invalid={searchIdentifierForm.formState.errors.contact_identifier ? "true" : "false"}
                                                        />
                                                    ) : (
                                                        <Controller

                                                            control={searchIdentifierForm.control}
                                                            rules={{
                                                                required: true,
                                                                validate: value =>
                                                                    watchSearchIdentifierContactType === "Phone Number" && isPhoneValid(value),
                                                            }}
                                                            render={({ field }) => (
                                                                <PhoneInput
                                                                    {...field}
                                                                    className='w-full'
                                                                    required
                                                                    aria-invalid={searchIdentifierForm.formState.errors.contact_identifier ? "true" : "false"}
                                                                    defaultCountry="ae"
                                                                />
                                                            )}
                                                            name="contact_identifier"
                                                        />
                                                    )}
                                                    {/* Error Message */}
                                                    {searchIdentifierForm.formState.errors.contact_identifier && (
                                                        <div
                                                            className="text-red-700 mt-2 max-w-fit rounded relative"
                                                            role="alert"
                                                        >
                                                            <span className="block sm:inline">
                                                                {watchSearchIdentifierContactType === "Email" ? 'A valid email' : 'A valid phone number'} is
                                                                required
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>



                                        {/* Submit Button */}
                                        <div className="md:w-3/12 text-center md:pl-6">
                                            <button
                                                className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
                                                disabled={isLoading}
                                                onClick={() => setShowOutput(true)}
                                            >
                                                <svg
                                                    fill="none"
                                                    className={`w-4 text-white mr-2 ${isLoading ? 'animate-spin' : ''}`}
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                    />
                                                </svg>
                                                {isLoading ? 'Checking...' : 'Check'}
                                            </button>
                                        </div>

                                    </div>

                                    <hr />
                                    <div className="w-full p-4 text-right text-gray-500">
                                        <button className="inline-flex items-center focus:outline-none mr-4" onClick={() => setShowOutput(false)}>
                                            <svg fill="none" className="w-4 mr-2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Clear Output
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>



                {showOutput && (
                    <div className="mx-auto container md:w-3/4 shadow-md">
                        {searchedContact && searchedContact.status === 'Scam' ? (
                            <div
                                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow-md my-4"
                                role="alert"
                            >
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1 4h.01m-6.938 4h13.856C18.992 20 21 17.992 21 15.43V8.57C21 6.008 18.992 4 16.43 4H7.57C5.008 4 3 6.008 3 8.57v6.86C3 17.992 5.008 20 7.57 20z"
                                        ></path>
                                    </svg>
                                    <strong className="font-bold">Scam Alert!</strong>
                                </div>
                                <span className="block sm:inline mt-2">
                                    The phone number is reported and identified as a scam.
                                </span>
                                <div className="mt-4">
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
                                    {searchedContact.lastScreenshot && (
                                        <div className="mt-2">
                                            <strong>Screenshot:</strong><br />
                                            <img
                                                src={`${BASE_API_URL}storage/${searchedContact.lastScreenshot}`}
                                                alt="screenshot"
                                                className="mt-2 border rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : searchedContact?.status === 'Not Scam' ? (
                            <div
                                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 shadow-md my-4"
                                role="alert"
                            >
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1 4h.01m-6.938 4h13.856C18.992 20 21 17.992 21 15.43V8.57C21 6.008 18.992 4 16.43 4H7.57C5.008 4 3 6.008 3 8.57v6.86C3 17.992 5.008 20 7.57 20z"
                                        ></path>
                                    </svg>
                                    <strong className="font-bold">No Information Available</strong>
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
                                    <button className="bg-red-500 font-bold text-white p-2 rounded-lg uppercase text-sm mt-4">Report As Scam</button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}



            </section>

        </>

    );
};

export default CheckForScams;
