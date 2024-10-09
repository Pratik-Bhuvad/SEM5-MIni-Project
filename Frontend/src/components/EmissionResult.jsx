// src/components/EmissionResult.js
import React from 'react';
import { FaCloud } from 'react-icons/fa'; // You can add more icons from react-icons if needed

const EmissionResult = ({ emissions }) => {
    return (
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg my-5">
            <h2 className="text-3xl font-bold text-center  mb-4">CO2 Emission Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                    <FaCloud className="text-4xl text-green-500 mr-2" />
                    <div>
                        <p className="text-lg text-white">
                            <strong>Website:</strong> {emissions.website}
                        </p>
                    </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                    <FaCloud className="text-4xl text-green-500 mr-2" />
                    <div>
                        <p className="text-lg text-white">
                            <strong>Total Transfer Size:</strong> {emissions.totalTransferSize}
                        </p>
                    </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                    <FaCloud className="text-4xl text-green-500 mr-2" />
                    <div>
                        <p className="text-lg text-white">
                            <strong>Estimated CO2 Emission:</strong> {emissions.estimatedCO2Emission}
                        </p>
                    </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                    <FaCloud className="text-4xl text-green-500 mr-2" />
                    <div>
                        <p className="text-lg text-white">
                            <strong>CO2 Emission Per MB:</strong> {emissions.CO2EmissionPerMB}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmissionResult;
