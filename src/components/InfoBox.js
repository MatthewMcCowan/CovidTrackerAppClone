import React from 'react'

const InfoBox = ({ title, cases, total, ...props}) => {
    return (
        <div onClick={props.onClick} className='hover:bg-blue-300  cursor-pointer h-64 overflow-hidden bg-blue-100 rounded-lg shadow-lg'>
            <div className="     px-6 py-4">
                <h2 className='font-bold text-2xl mb-2'>{title}</h2>
                <p> <span className='text-4xl text-blue-800'>{cases}</span></p>
                <p>{total} Total </p>
            </div>
        </div>
    )
}

export default InfoBox
