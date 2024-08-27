import React from 'react';

interface ScamTypeSelectorProps {
    searchIdentifierForm: any;
}

const ScamTypeSelector: React.FC<ScamTypeSelectorProps> = ({ searchIdentifierForm }) => (
    <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-black items-center">
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
    </div>
);

export default ScamTypeSelector;
