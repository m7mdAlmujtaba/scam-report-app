import { Controller, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import FormHeader from "./form/FormHeader";

enum ScamTypeEnum {
    SMS = 'SMS', CALL = 'Call', WHATSAPP = 'WhatsApp', EMAIL = 'Email'
}
const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};
type ScamReportForm = {
    reported_type: 'SCAM' | 'NOT_SCAM';
    scam_type: ScamTypeEnum;
    contact_identifier: string;
    details?: string;
    screenshot: FileList;
};

interface ReportScamFormProps {
    reportScamForm: UseFormReturn<ScamReportForm>;
    reportContact: SubmitHandler<ScamReportForm>;
    watchReportScamContactType: ScamTypeEnum;
}

const ReportScamForm: React.FC<ReportScamFormProps> = ({
    reportScamForm,
    reportContact,
    watchReportScamContactType,
}) => {
    return (
        <section className="py-10 bg-gray-100  bg-opacity-50">
            <div className="mx-2 md:mx-auto md:w-2/3 shadow-md">

                <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden border border-white-800 shadow-xl rounded  p-[2px]">
                    <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#F87171_20deg,transparent_120deg)]"> </div>
                    <div className="mx-auto z-20 container shadow-md">
                        <FormHeader color="red-400" title="Report a Scam Number/Email" />

                        <div className="bg-white space-y-6 p-5">
                            <form onSubmit={reportScamForm.handleSubmit(reportContact)}>
                                <div className="mb-4">
                                    <label className="block mb-2 font-bold">Scam Type</label>
                                    <div className="flex space-x-4">
                                        <label className='flex text-center items-center'>
                                            <input
                                                {...reportScamForm.register('scam_type')}
                                                type="radio"
                                                name="scam_type"
                                                value={ScamTypeEnum.SMS}
                                                className="mr-2"
                                                defaultChecked
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-400 mx-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                            </svg>

                                            SMS
                                        </label>
                                        <label className='flex text-center items-center'>
                                            <input
                                                {...reportScamForm.register('scam_type')}
                                                type="radio"
                                                name="scam_type"
                                                value={ScamTypeEnum.CALL}
                                                className="mr-2"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-400 mx-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>
                                            Call
                                        </label>
                                        <label className='flex text-center items-center'>
                                            <input
                                                {...reportScamForm.register('scam_type')}
                                                type="radio"
                                                name="scam_type"
                                                value={ScamTypeEnum.WHATSAPP}
                                                className="mr-2"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-400 mx-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75 0 2.125.637 4.105 1.722 5.76L2.25 21.75l4.033-1.029c1.677 1.109 3.679 1.779 5.717 1.779 5.376 0 9.75-4.374 9.75-9.75s-4.374-9.75-9.75-9.75zm5.542 13.602c-.28.145-1.64.821-1.901.905-.26.086-.451.142-.642-.138-.19-.28-.74-.898-.901-1.085-.162-.186-.327-.209-.616-.067-.288.141-1.197.434-2.268-1.416-.832-.741-1.392-1.659-1.55-1.94-.157-.28-.007-.434.138-.616.148-.182.276-.329.417-.487.142-.157.196-.283.276-.47.081-.187.05-.354-.018-.502-.068-.148-.639-1.546-.876-2.12-.235-.565-.474-.494-.636-.503h-.554c-.186 0-.489.07-.751.363-.262.292-.998 1.064-.998 2.383 0 1.319 1.022 2.75 1.171 2.937.145.187 2.008 3.076 4.882 4.31.676.289 1.201.452 1.626.588.682.217 1.297.183 1.793.126.553-.068 1.646-.669 1.885-1.313.239-.644.22-1.195.149-1.308-.071-.113-.257-.195-.537-.329z" />
                                            </svg>


                                            WhatsApp
                                        </label>
                                        <label className='flex text-center items-center'>
                                            <input
                                                {...reportScamForm.register('scam_type')}
                                                type="radio"
                                                name="scam_type"
                                                value={ScamTypeEnum.EMAIL}
                                                className="mr-2"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-400 mx-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                            Email
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-bold">
                                        {watchReportScamContactType === ScamTypeEnum.EMAIL
                                            ? 'Email'
                                            : 'Phone Number'}
                                    </label>
                                    {watchReportScamContactType === ScamTypeEnum.EMAIL ? (
                                        <input
                                            {...reportScamForm.register('contact_identifier', {
                                                required: true,
                                            })}
                                            type="email"
                                            placeholder="Enter email"
                                            className="w-full p-2  border border-red-500 outline-0 "
                                            aria-invalid={
                                                reportScamForm.formState.errors.contact_identifier
                                                    ? 'true'
                                                    : 'false'
                                            }
                                        />
                                    ) : (
                                        <Controller
                                            control={reportScamForm.control}
                                            rules={{
                                                required: true,
                                                validate: (value) => isPhoneValid(value),
                                            }}
                                            render={({ field }) => (
                                                <PhoneInput
                                                    {...field}
                                                    required
                                                    className='w-full border border-red-500'
                                                    aria-invalid={
                                                        reportScamForm.formState.errors.contact_identifier
                                                            ? 'true'
                                                            : 'false'
                                                    }
                                                    defaultCountry="ae"
                                                />
                                            )}
                                            name="contact_identifier"
                                        />
                                    )}
                                    {reportScamForm.formState.errors.contact_identifier && (
                                        <div
                                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 max-w-fit rounded relative"
                                            role="alert"
                                        >
                                            <span className="block sm:inline">
                                                {watchReportScamContactType === ScamTypeEnum.EMAIL
                                                    ? 'A valid email'
                                                    : 'A valid phone number'}{' '}
                                                is required
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-bold">Upload Screenshot</label>
                                    <label className="mt-2 text-sm text-black-950">
                                        Uploading a screenshot can provide strong evidence to support your
                                        report.
                                    </label>

                                    <input
                                        {...reportScamForm.register('screenshot')}
                                        name="screenshot"
                                        type="file"
                                        className="w-full p-2 border rounded"
                                        aria-invalid={
                                            reportScamForm.formState.errors.screenshot ? 'true' : 'false'
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-bold">Details</label>
                                    <textarea
                                        {...reportScamForm.register('details')}
                                        rows={2}
                                        placeholder="Describe the case.."
                                        className="w-full p-2  border border-red-500 outline-0 "
                                    />
                                </div>
                                <div className="md:w-3/12 text-center">
                                    <button className="text-white w-full rounded-md text-center bg-red-400 py-2 px-4 inline-flex items-center focus:outline-none">Submit</button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReportScamForm;
