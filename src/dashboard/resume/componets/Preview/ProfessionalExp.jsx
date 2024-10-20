import React from 'react'

const ProfessionalExp = ({ resumeInfo }) => {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{color:resumeInfo?.themeColor }}>
                    Professional Experience
            </h2>
            <hr style={{
                borderColor:resumeInfo?.themeColor
            }}/>
            {resumeInfo?.experience.map}
        </div>
    )
}

export default ProfessionalExp