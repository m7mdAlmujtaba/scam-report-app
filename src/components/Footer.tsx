import { FaLinkedinIn, FaInstagram, FaFacebookF, FaEnvelope } from 'react-icons/fa';
import FloatingWhatsApp from './FloatingWhatsApp';
import FloatingPhone from './FloatingPhone';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-20">
            {/* <FloatingWhatsApp />
            <FloatingPhone /> */}
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0 basis-1/3">
                    <h5 className="text-lg font-semibold mb-2">ScamChecker.ae</h5>
                    <p className="text-sm mb-4">Your go-to platform for identifying and reporting scam contacts. Stay informed, stay safe.</p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaLinkedinIn className="w-5 h-5" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaInstagram className="w-5 h-5" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaFacebookF className="w-5 h-5" />
                        </a>
                        <a href="mailto:info@scamchecker.ae" className="hover:text-gray-400">
                            <FaEnvelope className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <div className="text-center mb-4 md:mb-0 basis-1/3">
                    <p className="text-sm">&copy; 2024 ScamChecker.ae. All rights reserved.</p>
                </div>
                <div className="text-center md:text-right basis-1/3">
                    <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a> |
                    <a href="/terms-of-service" className="text-sm text-gray-400 hover:text-white ml-2">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
