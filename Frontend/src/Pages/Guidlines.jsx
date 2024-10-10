import React from 'react'
import guidelinesData from "../data/guidelines.json"

const Guidlines = () => {
    console.log(guidelinesData)
    return (
        <section id="guidelines" className="py-10 md:px-6 bg-gray-100">
            <h2 className="md:text-5xl text-3xl font-bold text-gray-800 text-center mb-8">Guidelines for Reducing CO2 Emissions in Your Project</h2>
            <p className="md:text-xl text-center text-gray-600 mb-10">
            Adhere to these guidelines to improve the sustainability and effectiveness of your project, ensuring a positive impact on the environment and user experience
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-11/12 mx-auto">
                {guidelinesData.guidelines.map((guideline) => (
                    <div key={guideline.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <div className="text-4xl mb-4">{guideline.icon}</div>
                        <h3 className="text-2xl font-semibold mb-2">{guideline.title}</h3>
                        <p className="text-gray-500 text-center">{guideline.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Guidlines