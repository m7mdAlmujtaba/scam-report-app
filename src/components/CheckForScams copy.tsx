import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PhoneInput } from "react-international-phone";

interface CheckForScamsProps {
  searchIdentifierForm: any;
  searchContact: (data: any) => void;
  watchSearchIdentifierContactType: string;
  searchedContact: any;
  BASE_API_URL: string;
  isPhoneValid: (value: string) => boolean;
}

const CheckForScams: React.FC<CheckForScamsProps> = ({
  searchIdentifierForm,
  searchContact,
  watchSearchIdentifierContactType,
  searchedContact,
  BASE_API_URL,
  isPhoneValid,
}) => {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-bold mb-4">Check for Scams</h2>
      <div className="flex space-x-4">
        <form onSubmit={searchIdentifierForm.handleSubmit(searchContact)}>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Scam Type</label>
            <div className="flex space-x-4">
              <label>
                <input
                  {...searchIdentifierForm.register('contact_type')}
                  type="radio"
                  name="contact_type"
                  value="Phone Number"
                  className="mr-2"
                />
                Phone Number
              </label>
              <label>
                <input
                  {...searchIdentifierForm.register('contact_type')}
                  type="radio"
                  name="contact_type"
                  value="Email"
                  className="mr-2"
                />
                Email
              </label>
            </div>
          </div>
          <div className="mb-4">
            {watchSearchIdentifierContactType === "Email" ? (
              <input
                {...searchIdentifierForm.register('contact_identifier', { required: true })}
                type="email"
                placeholder="Enter email"
                className="w-full p-2 border rounded"
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
                    required
                    aria-invalid={searchIdentifierForm.formState.errors.contact_identifier ? "true" : "false"}
                    defaultCountry="ae"
                  />
                )}
                name="contact_identifier"
              />
            )}
          </div>
          {searchIdentifierForm.formState.errors.contact_identifier && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 max-w-fit rounded relative"
              role="alert"
            >
              <span className="block sm:inline">
                {watchSearchIdentifierContactType === "Email" ? 'A valid email' : 'A valid phone number'} is
                required
              </span>
            </div>
          )}
          <button className="bg-blue-500 text-white p-2 rounded">Check</button>
        </form>
      </div>
      {searchedContact && searchedContact.status === 'Scam' ? (
        <div
          className="bg-red-200 border border-red-400 text-gray-900 px-4 py-3 rounded relative my-4"
          role="alert"
        >
          <strong className="font-bold">Scam Alert!</strong>
          <br />
          <span className="block sm:inline">
            The phone number is reported and identified as a scam.
          </span>
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
            <div><strong>Screenshot:</strong><br />
              <img src={`${BASE_API_URL}storage/${searchedContact.lastScreenshot}`} alt="screenshot" className="mt-2 border rounded" />
            </div>
          )}
        </div>
      ) : searchedContact?.status === 'Not Scam' ? (
        <div
          className="bg-orange-50 border border-orange-400 text-gray-900 px-4 py-3 rounded relative my-4"
          role="alert"
        >
          <strong className="font-bold">!!</strong>
          <br />
          <span className="block sm:inline">
            No information is available for this number at the moment. Be careful and ensure you verify the identity of unknown contacts.
          </span>
          <div><strong>Contact Identifier:</strong> {searchedContact.contactIdentifier}</div>
          <div><strong>Number of Searches:</strong> {searchedContact.searchCount}</div>
          {searchedContact.lastSearchDate && (
            <div><strong>Last Searched Date:</strong> {new Date(searchedContact.lastSearchDate).toLocaleDateString()}</div>
          )}
          <div className="text-center">
            <strong>If you have concerns, please report it as a scam for additional review.</strong>
          </div>
          <div className="text-center">
            <button className="bg-red-500 text-white p-2 rounded">Report As Scam</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckForScams;
