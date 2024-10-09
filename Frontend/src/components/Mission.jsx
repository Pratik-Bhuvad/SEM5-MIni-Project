import React from 'react';

const Mission = ({ mission }) => {
    return (
        <div className="">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">{mission.title}</h3>
            <p className="text-xl text-gray-500 pr-3 leading-relaxed text-justify">{mission.description}</p>
        </div>
    );
};

export default Mission;
