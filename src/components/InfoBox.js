import React from 'react'

const InfoBox = ({ title, cases, total}) => {
    return (
        <div className='card-container w-64 h-64 hover:rounded overflow-hidden hover:shadow-lg hover:bg-blue-100'>
            <div className="card-content px-6 py-4">
                <h2 className='font-bold text-2xl mb-2'>{title}</h2>
                <p> <span className='text-4xl'>{cases}</span></p>
                <p>{total} Total </p>
            </div>
        </div>
    )
}

export default InfoBox
