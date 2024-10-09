import React from 'react'

const Values = ({ value }) => {
  return (
    <div className='w-11/12'> 
      <h1 className='text-3xl font-mono leading-relaxed font-semibold text-gray-800'>{value.title}</h1>
      <p className="text-xl text-gray-500 pr-3 leading-relaxed">{value.description}</p>
    </div>
  )
}

export default Values
