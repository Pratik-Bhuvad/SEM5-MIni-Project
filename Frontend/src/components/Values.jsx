import React from 'react'

const Values = ({ value }) => {
  return (
    <div className='md:w-11/12 w-full md:border-0 border-2 p-4 rounded-md'> 
      <h1 className='md:text-3xl text-xl font-mono leading-relaxed font-semibold text-gray-800'>{value.title}</h1>
      <p className="md:text-xl text-base text-gray-500 md:pr-3 leading-relaxed">{value.description}</p>
    </div>
  )
}

export default Values
