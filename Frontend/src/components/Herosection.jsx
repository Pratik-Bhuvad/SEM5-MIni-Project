import React from 'react'
import { Link } from 'react-router-dom'

const Herosection = () => {
    return (
        <div className='w-full h-[80vh] px-7 bg-neutral-100 flex items-center justify-evenly'>
            <div id="text" className='w-2/6 *:my-10'>
                <h1 className="text-5xl font-bold leading-normal text-slate-700">
                    Reduce Your Website's Carbon Footprint
                </h1>
                <p className='text-xl text-justify mb-5'>
                    Take the first step towards sustainability by assessing and lowering the carbon emissions produced by your website.
                </p>
                <button className='rounded-full bg-blue-300 p-3 px-5 text-xl font-bold text-slate-800'>
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
