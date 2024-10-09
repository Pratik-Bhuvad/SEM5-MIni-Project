// src/components/CssOptimization.js
import React from 'react';

const CssOptimization = ({ cssOptimization }) => {
    return (
        <div>
            <h2 className='text-3xl font-bold'>CSS Optimization:</h2>
            <p><strong>Original CSS Length:</strong> {cssOptimization.originalCSSLength} bytes</p>
            <p><strong>Minified CSS Length:</strong> {cssOptimization.minifiedCSSLength} bytes</p>
            {/* You can display more CSS details if needed */}
        </div>
    );
};

export default CssOptimization;
