import React, { useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import axios from 'axios';
import EmissionResult from '../components/EmissionResult';
import CssOptimization from '../components/CssOptimization';
import SpaCheck from '../components/SpaCheck';
import ImageOptimization from '../components/ImageOptimization';

const Emission = () => {
    const [weburl, setWeburl] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);;

    const handleChange = (e) => {
        setWeburl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
        if (!urlPattern.test(weburl)) {
            alert('Please enter a valid website URL.');
            setWeburl('');
            return;
        }

        setLoading(true);  // Set loading to true when API call starts
        setResponse(null);

        try {
            console.log(weburl)
            const res = await axios.post('http://192.168.91.171:5000/api/analyze', {
                url: {
                    value: weburl
                }
            });
            setResponse(res.data);

            console.log(res.data);

        } catch (error) {
            console.error('Error during API call or storing data:', error);
            alert('There was an error analyzing the URL or storing data. Please try again later.');
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='w-screen min-h-[87vh] overflow-y-auto py-7 *:my-10'>
            <h1 className='md:text-7xl text-2xl font-bold font-mono text-center md:w-2/4 mx-auto'>How Much CO2 Does Your Website Emit?</h1>
            <p className='md:text-4xl text-base px-5 mx-auto md:w-3/5 font-mono font-medium text-center'>Enter your website address and we'll calculate how much carbon that page is emitting</p>
            <form onSubmit={handleSubmit} className='md:w-1/4 w-10/12 mx-auto flex flex-col *:my-5 *:py-7 *:rounded-lg'>
                <input type="text" value={weburl} onChange={handleChange} className='border-2 border-black px-5 text-xl text-center' placeholder='Website.com' />
                <input type="submit" className='font-bold text-xl bg-black text-white cursor-pointer shadow-zinc-800 shadow-md' value="Calculate CO2 Emission" />
            </form>

            {loading && (
                <div className='text-center mt-5'>
                    <p className='text-2xl font-mono'>Calculating CO2 emissions...</p>
                    <div className='flex justify-center items-center mt-3'>
                        <MagnifyingGlass
                            visible={true}
                            height="180"
                            width="180"
                            ariaLabel="magnifying-glass-loading"
                            wrapperClass="magnifying-glass-wrapper"
                            glassColor="#c0efff"
                            color="#e15b64"
                        />
                    </div>
                </div>
            )}

            {response && (
                <div id="Response" className="mt-5 md:w-3/5 mx-auto *:my-5">
                    <EmissionResult emissions={response.emissions} />
                    <ImageOptimization imageOptimization={response.imageOptimization} />
                    <CssOptimization cssOptimization={response.cssOptimization} />
                    <SpaCheck spaCheck={response.spaCheck} />
                </div>
            )}
        </div>
    );
};

export default Emission;