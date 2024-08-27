import './App.css'
import { PhoneInput } from "react-international-phone";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import 'react-international-phone/style.css';
import { useCallback, useEffect, useState } from "react";
import { PhoneNumberUtil } from 'google-libphonenumber';
import { BASE_API_URL } from "./constants/globals.ts";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const phoneUtil = PhoneNumberUtil.getInstance();



enum ScamTypeEnum {
  SMS = 'SMS', CALL = 'Call', WHATSAPP = 'WhatsApp', EMAIL = 'Email'
}

type Statistics = {
  reportedContactsCount: Record<'Phone Number' | 'Email', number>,
  scamIdentifiersCount: number,
  searchCount: number
}

type ScamReportForm = {
  reported_type: 'SCAM' | 'NOT_SCAM'
  scam_type: ScamTypeEnum
  contact_identifier: string
  details?: string
  screenshot: FileList
}

type SearchIdentifierForm = {
  contact_type: 'Phone Number' | 'Email',
  contact_identifier: string,
  user_id: string; // Add user_id property

}

const App = () => {
  const reportScamForm = useForm<ScamReportForm>({
    defaultValues: {
      reported_type: 'SCAM',
      scam_type: ScamTypeEnum.CALL,
      contact_identifier: ''
    }
  })
  const reportNotScamForm = useForm<ScamReportForm>({
    defaultValues: {
      reported_type: 'NOT_SCAM',
      scam_type: ScamTypeEnum.CALL,
      contact_identifier: ''
    }
  })
  const searchIdentifierForm = useForm<SearchIdentifierForm>({
    defaultValues: {
      contact_type: 'Phone Number',
      contact_identifier: '',
      user_id: '', // Set user ID in default values
    }
  })

  const [searchedContact, setSearchedContact] = useState<{
    status: "Scam",
    searchCount: number,
    contactIdentifier: string,
    lastSearchDate?: string,
    reportedCount: number,
    lastReportDate?: string,
    lastScreenshot?: string,
    lastDetails?: string,
    lastFlag?: string
  } | {
    status: "Not Scam",
    contactIdentifier: string,
    searchCount: number,
    lastSearchDate?: string,
  } | undefined>(undefined)
  const watchReportScamContactType = reportScamForm.watch('scam_type')
  const watchReportNotScamContactType = reportNotScamForm.watch('scam_type')
  const watchSearchIdentifierContactType = searchIdentifierForm.watch('contact_type')

  const [statistics, setStatistics] = useState<Statistics>()

  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (watchReportScamContactType === ScamTypeEnum.EMAIL)
      reportScamForm.setValue('contact_identifier', '')
  }, [reportScamForm, watchReportScamContactType]);

  useEffect(() => {
    if (watchReportNotScamContactType === ScamTypeEnum.EMAIL)
      reportNotScamForm.setValue('contact_identifier', '')
  }, [reportNotScamForm, watchReportNotScamContactType]);

  useEffect(() => {
    if (watchSearchIdentifierContactType === "Email")
      searchIdentifierForm.setValue("contact_identifier", '')
  }, [searchIdentifierForm, watchSearchIdentifierContactType]);

  const reportContact: SubmitHandler<ScamReportForm> = useCallback((data) => {
    const formData = new FormData()
    formData.append('reported_type', data.reported_type)
    formData.append('contact_identifier', data.contact_identifier)
    if (data.screenshot[0]) {
      formData.append('screenshot', data.screenshot[0])
    }

    formData.append('scam_type', data.scam_type)
    if (data.details) {
      formData.append('details', data.details)
    }

    fetch(`${BASE_API_URL}api/report-contact`, {
      method: 'POST',
      body: formData,
      headers: {
        accept: 'application/json'
      }
    }).then(res => {

      if (res.status >= 200 && res.status < 300) {
        toast.success('Contact reported successfully.')
        if (data.reported_type === "NOT_SCAM") {
          reportNotScamForm.reset()
        } else {
          reportScamForm.reset()
        }
      } else {
        toast.error('You have already reported this contact.')
      }
    })
  }, [reportNotScamForm, reportScamForm])

  const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

  const searchContact: SubmitHandler<SearchIdentifierForm> = useCallback((data) => {
    const url = new URL(`${BASE_API_URL}api/search-contact`);
    url.searchParams.append('contact_type', data.contact_type);
    url.searchParams.append('contact_identifier', data.contact_identifier);
    url.searchParams.append('user_id', userId || ''); // Include user ID in the request

    fetch(url.toString(), {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        res.json().then(data => setSearchedContact(data))
        searchIdentifierForm.reset()
      } else {
        toast.error('Something went wrong. Please try again later.')
      }
    })
  }, [searchIdentifierForm])

  useEffect(() => {
    fetch(`${BASE_API_URL}api/statistics`, {
      method: 'GET'
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        res.json().then(data => setStatistics(data))
      }
    })
  }, []);





  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <a href='/'><u>ScamChecker.ae</u></a>
          </div>

          <div className="flex space-x-4">
            <div className="text-xl font-bold">
              <a href='/about'><u>About</u></a>
            </div>
            <div className="text-xl font-bold">
              <a href='/contactus'><u>Contact Us</u></a>
            </div>
            <div className="text-xl font-bold">
              <a href='/login'><u>Login</u></a>
            </div>
          </div>
        </div>
      </nav>


      <div className="text-center"><br></br>
        Be a leader in scam detection with<a href='/'  ><u> ScamChecker.ae </u></a>. <br></br>Report suspicious numbers and search our database, Built on real user experiences.<br></br>We verify scam statuses and provide detailed metrics to ensure transparency and enhance your safety.
      </div>

      <div className="container mx-auto mt-8 space-y-8">
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Statistics:</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div>Reported Numbers</div>
              <div className="text-2xl font-bold">{statistics?.reportedContactsCount['Phone Number'] ?? 0}</div>

            </div>
            <div className="text-center">
              <div>Reported Emails</div>
              <div className="text-2xl font-bold">{statistics?.reportedContactsCount['Email'] ?? 0}</div>

            </div>
            <div className="text-center">
              <div>Scam Numbers</div>
              <div className="text-2xl font-bold">{statistics?.scamIdentifiersCount ?? 0}</div>

            </div>
            <div className="text-center">
              <div>Search Number Attempts</div>
              <div className="text-2xl font-bold">{statistics?.searchCount ?? 0}</div>

            </div>
          </div>
        </div>

        <div className="container md:max-w-3xl mt-8 space-y-8 mx-auto">
          <div className="bg-white shadow-md rounded p-6">

            <h2 className="text-xl font-bold mb-4">Check for Scams</h2>
            <div className="flex space-x-4">
              <form onSubmit={searchIdentifierForm.handleSubmit(searchContact)}>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Scam Type</label>
                  <div className="flex space-x-4">
                    <label><input {...searchIdentifierForm.register('contact_type')} type="radio" name="contact_type"
                      value="Phone Number"
                      className="mr-2"
                    />Phone Number</label>
                    <label><input {...searchIdentifierForm.register('contact_type')} type="radio" name="contact_type"
                      value="Email"
                      className="mr-2"
                    />Email</label>
                  </div>
                </div>
                <div className="mb-4">
                  {
                    watchSearchIdentifierContactType === "Email" ?
                      <input {...searchIdentifierForm.register('contact_identifier', { required: true })} type="email"
                        placeholder="Enter email"
                        className="w-full p-2 border rounded"
                        aria-invalid={searchIdentifierForm.formState.errors.contact_identifier ? "true" : "false"} /> :
                      <Controller control={searchIdentifierForm.control}
                        rules={{
                          required: true,
                          validate: value => watchSearchIdentifierContactType === "Phone Number" && isPhoneValid(value)
                        }}
                        render={({ field }) => <PhoneInput
                          {...field}
                          required
                          aria-invalid={searchIdentifierForm.formState.errors.contact_identifier ? "true" : "false"}
                          defaultCountry="ae" />} name="contact_identifier"
                      />
                  }
                </div>
                {searchIdentifierForm.formState.errors.contact_identifier && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 max-w-fit rounded relative"
                    role="alert">
                    <span
                      className="block sm:inline">{watchSearchIdentifierContactType === "Email" ? 'A valid email' : 'A valid phone number'} is
                      required</span>
                  </div>
                )}
                <button className="bg-blue-500 text-white p-2 rounded">Check</button>
              </form>
            </div>
            {
              searchedContact && searchedContact.status === 'Scam' ?
                <>
                  <div className="bg-red-200 border border-red-400 text-gray-900 px-4 py-3 rounded relative my-4"
                    role="alert">
                    <strong className="font-bold">Scam Alert!</strong><br />
                    <span className="block sm:inline">The phone number is reported and identified as a scam.</span>

                    <div><strong>Contact Identifier:</strong> {searchedContact.contactIdentifier}</div>
                    <div><strong>Number of Searches:</strong> {searchedContact.searchCount}</div>
                    {searchedContact.lastSearchDate &&
                      <div><strong>Last Searched Date:</strong> {new Date(searchedContact.lastSearchDate).toLocaleDateString()}</div>}
                    <div><strong>Number Of Reports:</strong> {searchedContact.reportedCount}</div>
                    {searchedContact.lastReportDate && <div><strong>Last Reported Date:</strong> {new Date(searchedContact.lastReportDate).toLocaleDateString()}</div>}
                    {searchedContact.lastDetails &&
                      <div><strong>Last Reported Details:</strong> {searchedContact.lastDetails}</div>}
                    {searchedContact.lastFlag && <div><strong>Severity:</strong> {searchedContact.lastFlag}</div>}
                    {searchedContact.lastScreenshot && <div><strong>Screenshot:</strong><br /><img
                      src={`${BASE_API_URL}storage/${searchedContact.lastScreenshot}`} alt="screenshot"
                      className="mt-2 border rounded" /></div>}
                  </div>
                </> : searchedContact?.status === 'Not Scam' ? <>
                  <div className="bg-orange-50 border border-orange-400 text-gray-900 px-4 py-3 rounded relative my-4"
                    role="alert">
                    <strong className="font-bold">!!</strong><br />
                    <span className="block sm:inline">No information is available for this number at the moment. Be careful and ensure you verify the identity of unknown contacts.</span>

                    <div><strong>Contact Identifier:</strong> {searchedContact.contactIdentifier}</div>
                    <div><strong>Number of Searches:</strong> {searchedContact.searchCount}</div>
                    {searchedContact.lastSearchDate &&
                      <div><strong>Last Searched Date:</strong> {new Date(searchedContact.lastSearchDate).toLocaleDateString()}</div>}
                    <br></br> <div className="text-center"><strong>If you have concerns, please report it as a scam for additional review.</strong></div>
                    <div className="text-center"><button className="bg-red-500 text-white p-2 rounded">Report As Scam</button></div>
                  </div>


                </> : <></>
            }
          </div>

          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-bold mb-4">Report a Scam Number/Email</h2>
            <form onSubmit={reportScamForm.handleSubmit(reportContact)}>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Scam Type</label>
                <div className="flex space-x-4">
                  <label><input {...reportScamForm.register('scam_type')} type="radio" name="scam_type"
                    value={ScamTypeEnum.SMS}
                    className="mr-2"
                    defaultChecked
                  />SMS</label>
                  <label><input {...reportScamForm.register('scam_type')} type="radio" name="scam_type"
                    value={ScamTypeEnum.CALL}
                    className="mr-2"
                  />Call</label>
                  <label><input {...reportScamForm.register('scam_type')} type="radio" name="scam_type"
                    value={ScamTypeEnum.WHATSAPP} className="mr-2" />WhatsApp</label>
                  <label><input {...reportScamForm.register('scam_type')} type="radio" name="scam_type"
                    value={ScamTypeEnum.EMAIL} className="mr-2" />Email</label>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold">{watchReportScamContactType === ScamTypeEnum.EMAIL ? 'Email' : 'Phone Number'}</label>
                {
                  watchReportScamContactType === ScamTypeEnum.EMAIL ?
                    <input {...reportScamForm.register('contact_identifier', { required: true })} type="email"
                      placeholder="Enter email"
                      className="w-full p-2 border rounded"
                      aria-invalid={reportScamForm.formState.errors.contact_identifier ? "true" : "false"} /> :
                    <Controller control={reportScamForm.control}
                      rules={{
                        required: true,
                        validate: value => isPhoneValid(value)
                      }}
                      render={({ field }) => <PhoneInput
                        {...field}
                        required
                        aria-invalid={reportScamForm.formState.errors.contact_identifier ? "true" : "false"}
                        defaultCountry="ae" />} name="contact_identifier"
                    />
                }
                {reportScamForm.formState.errors.contact_identifier && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 max-w-fit rounded relative"
                    role="alert">
                    <span
                      className="block sm:inline">{watchReportScamContactType === ScamTypeEnum.EMAIL ? 'A valid email' : 'A valid phone number'} is
                      required</span>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Upload Screenshot</label>
                <label className="mt-2 text-sm text-black-950">Uploading a screenshot can provide strong evidence to support your report.</label>

                <input {...reportScamForm.register("screenshot")} name="screenshot" type="file"
                  className="w-full p-2 border rounded"
                  aria-invalid={reportScamForm.formState.errors.screenshot ? "true" : "false"} />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Details</label>
                <textarea {...reportScamForm.register('details')}
                  rows={2}
                  placeholder="Describe the case.."
                  className="w-full p-2 border rounded" />
              </div>
              <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>

          </div>
          <div className="bg-white shadow-md rounded p-6">
            <div className="text-center">
              <label className="mt-2 text-xs text-gray-800">
                If you discover that your number is incorrectly listed as a scam, report it as
                <a href='/'><u> not a scam</u></a>.
              </label>
              <br></br>
              <label className="mt-2 text-xs text-gray-800">© 2024 ScamChecker.ae</label>
            </div>
          </div>
          {/* <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-bold mb-4">Report as Not Scam</h2>
            <form onSubmit={reportNotScamForm.handleSubmit(reportContact)}>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Scam Type</label>
                <div className="flex space-x-4">
                  <label><input {...reportNotScamForm.register('scam_type')} type="radio" name="scam_type"
                    value={ScamTypeEnum.SMS}
                    className="mr-2"
                  />SMS</label>
                  <label><input {...reportNotScamForm.register('scam_type')} type="radio" name="scam_type"
                    value={ScamTypeEnum.CALL}
                    className="mr-2"
                  />Call</label>
                  <label><input {...reportNotScamForm.register('scam_type')} type="radio" name="scam_type"
                    value={ScamTypeEnum.WHATSAPP} className="mr-2" />WhatsApp</label>
                  <label><input {...reportNotScamForm.register('scam_type')} type="radio" name="scam_type"
                    value={ScamTypeEnum.EMAIL} className="mr-2" />Email</label>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold">{watchReportNotScamContactType === ScamTypeEnum.EMAIL ? 'Email' : 'Phone Number'}</label>
                {
                  watchReportNotScamContactType === ScamTypeEnum.EMAIL ?
                    <input {...reportNotScamForm.register('contact_identifier', { required: true })} type="email"
                      placeholder="Enter email"
                      className="w-full p-2 border rounded"
                      aria-invalid={reportNotScamForm.formState.errors.contact_identifier ? "true" : "false"} /> :
                    <Controller control={reportNotScamForm.control}
                      rules={{
                        required: true,
                        validate: value => isPhoneValid(value)
                      }}
                      render={({ field }) => <PhoneInput
                        {...field}
                        required
                        aria-invalid={reportNotScamForm.formState.errors.contact_identifier ? "true" : "false"}
                        defaultCountry="ae" />} name="contact_identifier"
                    />
                }
                {reportNotScamForm.formState.errors.contact_identifier && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 max-w-fit rounded relative"
                    role="alert">
                    <span
                      className="block sm:inline">{watchReportNotScamContactType === ScamTypeEnum.EMAIL ? 'A valid email' : 'A valid phone number'} is
                      required</span>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Upload Screenshot</label>
                <input {...reportNotScamForm.register("screenshot")} name="screenshot" type="file"
                  className="w-full p-2 border rounded"
                  aria-invalid={reportNotScamForm.formState.errors.screenshot ? "true" : "false"} />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Details</label>
                <textarea {...reportNotScamForm.register('details')}
                  rows={4}
                  placeholder="Enter details"
                  className="w-full p-2 border rounded" />
              </div>
              <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
          </div> */}

        </div>
      </div>
    </>
  )
}

export default App
