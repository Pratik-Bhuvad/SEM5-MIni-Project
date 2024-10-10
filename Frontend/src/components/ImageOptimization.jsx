// src/components/ImageOptimization.js
import React from 'react';

const ImageOptimization = ({ imageOptimization }) => {
    return (
        <div>
            <h2 className='text-3xl font-bold text-center'>Image Optimization:</h2>
            <div className="grid grid-cols-1 gap-4">
                {imageOptimization.map((image, index) => (
                    <div key={index} className=' p-4'>
                        <div className="flex flex-col md:flex-row justify-evenly mb-2">
                            <div className="flex flex-col my-3 md:my-0 *:my-1 border-2 p-4 md:w-2/5">
                                <img 
                                    src={image.original.url} 
                                    alt={`Original ${index}`} 
                                    className='w-full mb-2 rounded' 
                                />
                                <span className='font-semibold'>Original</span>
                                <p>Format: {image.original.format}</p>
                                <p>Size: {image.original.size.toFixed(2)} kb</p>
                                <p>CO2: {image.original.co2.toFixed(2)} g</p>
                            </div>
                            <div className="flex flex-col my-3 md:my-0 *:my-1 border-2 p-4 md:w-2/5">
                                <img 
                                    src={image.optimized.url} 
                                    alt={`Optimized ${index}`} 
                                    className='w-full mb-2 rounded' 
                                />
                                <span className='font-semibold'>Optimized</span>
                                <p>Format: {image.optimized.format}</p>
                                <p>Size: {image.optimized.size.toFixed(2)} kb</p>
                                <p>CO2: {image.optimized.co2.toFixed(2)} g</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageOptimization;
