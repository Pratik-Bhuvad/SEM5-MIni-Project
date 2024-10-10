// src/components/SpaCheck.js
import React from 'react';

const SpaCheck = ({ spaCheck }) => {
    return (
        <div>
            <h2 className='text-3xl font-bold my-3'>Single Page Application</h2>
            <p className='my-3'><strong>Is SPA:</strong> {spaCheck.isSPA ? 'The Website is a Single Page Application' : 'No'}</p>
            <p className='my-3'><strong>AJAX Request Count:</strong> {spaCheck.ajaxRequestCount}</p>
            {/* You can display more SPA details if needed */}
        </div>
    );
};

export default SpaCheck;
