import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PhoneInput } from "react-international-phone";
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Import icons
import FormHeader from './form/FormHeader';
import ScamTypeSelector from './form/ScamTypeSelector';
import ContactIdentifierInput from './form/ContactIdentifierInput';
import SubmitButton from './form/SubmitButton';
import OutputMessage from './form/OutputMessage';

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
                <div className='mx-2 md:mx-auto md:w-2/3 shadow-md'>
                    <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden border border-white-800 shadow-xl rounded  p-[2px]">
                        <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#818CF8_20deg,transparent_120deg)]"> </div>
                        <div className="mx-auto z-20 container shadow-md">
                            <FormHeader color="indigo-400" title='Check for Scams'/>
                            <div className="bg-white space-y-6">
                                <form onSubmit={searchIdentifierForm.handleSubmit(searchContact)}>
                                    <ScamTypeSelector searchIdentifierForm={searchIdentifierForm} />

                                    <hr />
                                    <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
                                        <ContactIdentifierInput
                                            searchIdentifierForm={searchIdentifierForm}
                                            watchSearchIdentifierContactType={watchSearchIdentifierContactType}
                                            isPhoneValid={isPhoneValid}
                                        />


                                        {/* Submit Button */}

                                        <SubmitButton isLoading={isLoading} onClick={() => {
                                            setShowOutput(true);
                                            searchIdentifierForm.handleSubmit(searchContact)();
                                        }} />

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
                    <div className="mx-2 md:mx-auto container md:w-2/3 shadow-md">
                        <OutputMessage searchedContact={searchedContact} BASE_API_URL={BASE_API_URL} />
                    </div>
                )}
            </section>

        </>

    );
};

export default CheckForScams;
