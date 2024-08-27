import { FaWhatsapp } from 'react-icons/fa';
import React from 'react';

const FloatingWhatsApp = () => {
    return (
        <a 
            href="https://wa.me/yourphonenumber" // Replace with your WhatsApp number
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
            aria-label="Chat with us on WhatsApp"
        >
            <FaWhatsapp className="w-6 h-6" />
        </a>
    );
}

export default FloatingWhatsApp;
