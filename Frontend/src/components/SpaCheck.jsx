// src/components/SpaCheck.js
import React from 'react';

const SpaCheck = ({ spaCheck }) => {
    return (
        <div>
            <h2 className='text-3xl font-bold my-3'>Single Page Application</h2>
            <p className='my-3'><strong>Is SPA:</strong> {spaCheck.isSPA ? 'True' : 'False [Recommended]'}</p>
        </div>
    );
};

export default SpaCheck;
