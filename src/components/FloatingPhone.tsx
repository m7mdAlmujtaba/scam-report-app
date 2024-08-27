import { FaPhoneAlt } from 'react-icons/fa';
import React from 'react';

const FloatingPhone = () => {
    return (
        <a 
            href="tel:+1234567890" // Replace with your phone number
            className="fixed bottom-20 right-4 bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
            aria-label="Call us"
        >
            <FaPhoneAlt className="w-6 h-6" />
        </a>
    );
}

export default FloatingPhone;
