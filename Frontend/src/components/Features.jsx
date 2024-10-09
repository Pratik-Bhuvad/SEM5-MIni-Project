import React from 'react'
import featuresData from '../data/features.json'

const Features = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Our Key Features</h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuresData.features.map((feature, index) => (
                        <div key={index} className="p-6 bg-blue-50 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                            <p className="mt-4 text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
