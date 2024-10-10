import React from 'react'
import { Link } from 'react-router-dom'

const Callaction = () => {
    return (
        <section className="py-16 text-white w-screen md:h-[60vh]">
            <div className="bg-[url('/images/background.png')] bg-cover h-full w-3/4 mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center items-center *:my-5">
                <h2 className="text-3xl font-bold">Take Action and Reduce Your Website's Carbon Emissions Today</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto">
                    Start analyzing your website now and take meaningful steps to reduce your environmental impact.
                </p>
                <button className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out">
                    <Link to='/check'>
                        Start Now
                    </Link>
                </button>
            </div>
        </section>
    )
}

export default Callaction
