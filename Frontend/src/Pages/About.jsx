import React from 'react';
import missionData from '../data/mission.json'
import valuesData from '../data/values.json'
import blogsData from '../data/Blogs.json'
import Mission from '../components/Mission';
import Values from '../components/Values'
import Blog from '../components/Blog';

const About = () => {
    const images = [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80",
        "https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80",
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80",
        "https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80",
        "https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
    ];
    return (
        <div className='w-screen'>
            <section id="herosection" className='w-full h-[87vh] flex items-center justify-between px-10'>
                <div className='w-3/6 *:my-5'>
                    <h2 className='text-6xl font-bold leading-tight capitalize '>We’re transforming how websites impact the planet.</h2>
                    <p className="text-xl leading-relaxed text-gray-500 pr-5">
                        Our project is dedicated to minimizing the environmental footprint of websites by optimizing their performance and reducing CO2 emissions. By analyzing various aspects of a site—such as lazy loading, CSS optimization, and energy-efficient hosting—we empower developers to create more sustainable digital experiences. Join us in making the web a greener place, one site at a time.
                    </p>
                </div>
                <div className="w-2/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        {/* First Column */}
                        <div className="space-y-6 flex items-center">
                            <img loading="lazy" src={images[0]} alt="Image 1" className="w-full h-2/4 object-cover rounded-lg shadow-md" />
                        </div>

                        {/* Second Column */}
                        <div className="space-y-6 ">
                            <img loading="lazy" src={images[1]} alt="Image 2" className="w-full h-2/4 object-cover rounded-lg shadow-md" />
                            <img loading="lazy" src={images[2]} alt="Image 3" className="w-full h-2/4 object-cover rounded-lg shadow-md" />
                        </div>

                        {/* Third Column */}
                        <div className="space-y-6 relative bottom-16">
                            <img loading="lazy" src={images[3]} alt="Image 4" className="w-full h-2/4 object-cover rounded-lg shadow-md" />
                            <img loading="lazy" src={images[4]} alt="Image 5" className="w-full h-2/4 object-cover rounded-lg shadow-md" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section  */}
            <section id="mission" className='flex items-center justify-evenly bg-gray-200 w-screen py-10 px-10'>
                <div id="Msgs" className='w-3/5 *:my-7 pl-10'>
                    <h1 className='text-7xl font-bold font-mono'>Our Mission</h1>
                    {missionData.missions.map((mission, index) => {
                        return <Mission key={index} mission={mission} />;
                    })}
                </div>
                <div>
                    <div className="grid grid-cols-1 gap-10  mx-auto">
                        <div className="p-6  text-center">
                            <h3 className="text-5xl font-bold text-black">50+</h3>
                            <p className="text-lg text-gray-500 mt-2">Websites Analyzed for Sustainability</p>
                        </div>
                        <div className="p-6  text-center">
                            <h3 className="text-5xl font-bold text-black">10</h3>
                            <p className="text-lg text-gray-500 mt-2">Recommendations for Reducing CO2 Emissions</p>
                        </div>
                        <div className="p-6  text-center">
                            <h3 className="text-5xl font-bold text-black">3</h3>
                            <p className="text-lg text-gray-500 mt-2">Major Features Implemented</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section  */}
            <section id="values" className='w-screen py-10 px-16 *:my-10'>
                <h2 className='text-5xl font-bold font-mono my-5'>Our Values</h2>
                <p className='w-2/4 text-xl text-gray-500'>We prioritize sustainability, innovation, and collaboration to minimize the environmental impact of websites and foster a greener digital landscape</p>
                <div className='w-full px-10 h-96 grid-cols-1 grid md:grid-cols-3 gap-10'>
                    {valuesData.values.map((value, index) => {
                        return <Values key={index} value={value} />;
                    })}
                </div>
            </section>

            {/* Blog Section  */}
            <section id="blogs" className='w-screen md:h-[80vh] py-10 px-16 *:my-1'>
                <h2 className='text-5xl font-bold font-mono'>From the Blog</h2>
                <p className='w-2/4 text-xl text-gray-500'>"Explore insights on reducing website emissions.</p>
                <div className='w-11/12 mx-auto px-10 pt-10 h-4/5 grid-cols-1 grid md:grid-cols-3 gap-20'>
                    {blogsData.blogs.map((blog, index) => {
                        return <Blog key={index} blog={blog} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default About;
