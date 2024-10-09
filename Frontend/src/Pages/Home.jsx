import React from 'react'
import Herosection from '../components/Herosection'
import Features from '../components/Features'
import Callaction from '../components/Callaction'

const Home = () => {
  return (
    <div className='w-screen box-border'>
      <Herosection />
      <section className='w-screen  bg-gray-200 text-slate-800 py-10'>
        <h2 className="text-4xl text-center font-bold mb-10">Why Reducing Website Emissions Matters</h2>
        <div className='flex w-11/12 mx-auto items-center justify-evenly px-5 *:my-3'>
          <p className="text-lg text-justify w-1/3">
            Websites contribute to carbon emissions and energy consumption, impacting the environment. By optimizing your site, you can reduce its carbon footprint and promote sustainability. Simple adjustments, like image optimization and faster loading times, can lead to meaningful reductions in emissions. Taking action not only helps the planet but also improves user experience and showcases your commitment to being eco-friendly.
          </p>
          <img src="/images/graph.png" loading='lazy' alt="" />
        </div>
      </section>
      <Features />
      <Callaction />
    </div>
  )
}

export default Home