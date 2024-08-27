import React from 'react';
interface FormHeaderProps {
    color: string;
    title: string;
}
const FormHeader: React.FC<FormHeaderProps> = ({color, title}) => (
    <div className={`bg-${color} p-4 border-t-2 text-white border-${color} rounded-t`}>
        <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
                <h1 className="text-white font-bold uppercase">{title}</h1>
            </div>
        </div>
    </div>
);

export default FormHeader;
