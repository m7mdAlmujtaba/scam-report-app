import React from 'react';

interface SubmitButtonProps {
    isLoading: boolean;
    onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, onClick }) => (
    <div className="md:w-3/12 text-center md:pl-6">
        <button
            className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
            disabled={isLoading}
            onClick={onClick}
        >
            <svg
                fill="none"
                className={`w-4 text-white mr-2 ${isLoading ? 'animate-spin' : ''}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
            </svg>
            {isLoading ? 'Checking...' : 'Check'}
        </button>
    </div>
);

export default SubmitButton;
