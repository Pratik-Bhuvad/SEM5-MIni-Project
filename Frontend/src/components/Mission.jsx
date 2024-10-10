import React from 'react';

const Mission = ({ mission }) => {
    return (
        <div className="">
            <h3 className="md:text-2xl text-xl font-bold text-gray-700 mb-2">{mission.title}</h3>
            <p className="md:text-xl text-base text-gray-500 md:pr-3 leading-relaxed text-justify">{mission.description}</p>
        </div>
    );
};

export default Mission;
