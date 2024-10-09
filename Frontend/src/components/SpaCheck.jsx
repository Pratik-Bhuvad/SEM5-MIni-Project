// src/components/SpaCheck.js
import React from 'react';

const SpaCheck = ({ spaCheck }) => {
    return (
        <div>
            <h2 className='text-3xl font-bold'>SPA Check:</h2>
            <p><strong>Is SPA:</strong> {spaCheck.isSPA ? 'Yes' : 'No'}</p>
            <p><strong>AJAX Request Count:</strong> {spaCheck.ajaxRequestCount}</p>
            {/* You can display more SPA details if needed */}
        </div>
    );
};

export default SpaCheck;
