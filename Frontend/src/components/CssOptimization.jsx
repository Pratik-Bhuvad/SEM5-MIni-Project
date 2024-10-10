// src/components/CssOptimization.js
import React, { useState } from 'react';

const CssOptimization = ({ cssOptimization }) => {
    const [showOriginalFull, setShowOriginalFull] = useState(true);
    const [showMinifiedFull, setShowMinifiedFull] = useState(true);

    const formatCSS = (cssString) => {
        // Replace commas and semicolons with the same character followed by a newline
        return cssString
            .replace(/,/g, ',\n')  // Add newline after each comma
            .replace(/;/g, ';\n'); // Add newline after each semicolon
    };

    const minifiedCSSToDisplay = showMinifiedFull
        ? formatCSS(cssOptimization.minifiedCSS)
        : cssOptimization.minifiedCSSSnippet;

    const originalCSSToDisplay = showOriginalFull
        ? formatCSS(cssOptimization.originalCSS)
        : cssOptimization.originalCSSSnippet;

    return (
        <div className='w-full'>
            <h2 className='text-3xl font-bold'>CSS Optimization:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 my-3'>
                <p><strong>Original CSS Length:</strong> {cssOptimization.originalCSSLength} bytes</p>
                <p><strong>Minified CSS Length:</strong> {cssOptimization.minifiedCSSLength} bytes</p>
                
                <div className='w-full px-2 my-5'>
                    <h3 className='text-2xl font-semibold'>Original CSS Snippet:</h3>
                    <pre className='overflow-auto h-[50vh] p-2'>{originalCSSToDisplay}</pre>
                </div>

                <div className='w-full px-2 my-5'>
                    <h3 className='text-2xl font-semibold'>Minified CSS Snippet:</h3>
                    <pre className='overflow-auto h-[50vh] p-2'>{minifiedCSSToDisplay}</pre>
                </div>
            </div>
        </div>
    );
};

export default CssOptimization;
