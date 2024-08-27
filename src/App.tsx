import './App.css'
import { PhoneInput } from "react-international-phone";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import 'react-international-phone/style.css';
import { useCallback, useEffect, useState } from "react";
import { PhoneNumberUtil } from 'google-libphonenumber';
import { BASE_API_URL } from "./constants/globals.ts";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.tsx';
import Navbar from './components/Navbar.tsx';
import Counter from './components/Counter.tsx';
import CheckForScams from './components/CheckForScams.tsx';
import Footer from './components/Footer.tsx';
import ReportScamForm from './components/ReportScamForm.tsx';
import NotScamCard from './components/NotScamCard.tsx';

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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
        setIsLoading(false);
      } else {
        toast.error('Something went wrong. Please try again later.')
        setIsLoading(false);
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

      <Navbar />

      <Header />

      <Counter statistics={statistics} />
      <div className="mt-8">

          <CheckForScams
            searchIdentifierForm={searchIdentifierForm}
            searchContact={searchContact}
            watchSearchIdentifierContactType={watchSearchIdentifierContactType}
            searchedContact={searchedContact}
            BASE_API_URL={BASE_API_URL}
            isPhoneValid={isPhoneValid}
            isLoading={isLoading}  // Pass the isLoading state as a prop
          />

          <ReportScamForm
            reportScamForm={reportScamForm}
            reportContact={reportContact}
            watchReportScamContactType={watchReportScamContactType}
          />

          <NotScamCard />

          <Footer />

      </div>
    </>
  )
}

export default App
