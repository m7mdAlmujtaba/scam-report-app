import React from 'react';
import { Controller } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';

interface ContactIdentifierInputProps {
    searchIdentifierForm: any;
    watchSearchIdentifierContactType: string;
    isPhoneValid: (value: string) => boolean;
}

const ContactIdentifierInput: React.FC<ContactIdentifierInputProps> = ({
    searchIdentifierForm,
    watchSearchIdentifierContactType,
    isPhoneValid,
}) => (
    <div className="w-full mx-auto md:inline-flex">
        <div className="w-full inline-flex">
            <div className="w-full">
                {watchSearchIdentifierContactType === "Email" ? (
                    <input
                        {...searchIdentifierForm.register('contact_identifier', { required: true })}
                        type="email"
                        placeholder="Enter email"
                        className="w-full p-2  border border-indigo-500 outline-0 "
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
                                className='w-full border border-indigo-500'
                                required
                                aria-invalid={searchIdentifierForm.formState.errors.contact_identifier ? "true" : "false"}
                                defaultCountry="ae"
                            />
                        )}
                        name="contact_identifier"
                    />
                )}
                {searchIdentifierForm.formState.errors.contact_identifier && (
                    <div
                        className="text-red-700 mt-2 max-w-fit rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            {watchSearchIdentifierContactType === "Email" ? 'A valid email' : 'A valid phone number'} is required
                        </span>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default ContactIdentifierInput;
