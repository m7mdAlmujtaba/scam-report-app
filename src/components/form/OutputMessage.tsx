import React from 'react';
import ScamAlertMessage from './ScamAlertMessage';
import NoInfoMessage from './NoInfoMessage';

interface OutputMessageProps {
    searchedContact: any;
    BASE_API_URL: string;
}

const OutputMessage: React.FC<OutputMessageProps> = ({ searchedContact, BASE_API_URL }) => (
    <>
        {searchedContact && searchedContact.status === 'Scam' ? (
                          <ScamAlertMessage searchedContact={searchedContact} BASE_API_URL={BASE_API_URL} />
                        ) : searchedContact?.status === 'Not Scam' ? (
                            <NoInfoMessage searchedContact={searchedContact} />
                        ) : null}
    </>
);

export default OutputMessage;
