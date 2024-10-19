import React from 'react'
import { Link } from 'react-router-dom'

const Herosection = () => {
    return (
        <div className='w-full md:h-[80vh] px-7 bg-neutral-100 flex md:flex-row flex-col items-center justify-evenly'>
            <div id="text" className='md:w-2/6 md:*:my-10 *:my-3'>
                <h1 className="md:text-5xl text-2xl text-center md:text-left font-bold leading-normal text-slate-700">
                    Reduce Your Website's Carbon Footprint
                </h1>
                <p className='md:text-xl md:text-justify text-center px-1 md:px-0 mb-5'>
                    Take the first step towards sustainability by assessing and lowering the carbon emissions produced by your website.
                </p>
                <button className='rounded-full ml-[5rem] md:ml-0 bg-blue-300 p-3 px-5 text-xl font-bold text-slate-800'>
                    <Link to='/check'>
                        Start the Analysis
                    </Link>
                </button>
            </div>
            <img src="/images/hero-one.svg" loading='lazy' alt="" />
        </div>
    )
}

export default Herosection
