import React from 'react'

const PersonalDetail = ({resumeInfo}) => {
  return (
    <div >
        <h2 className='font-bold text-xl text-center'
        style={{color: resumeInfo?.themeColor}}
        >
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h2>
        <h2 className='text-center text-sm font-medium'
        style={{color: resumeInfo?.themeColor}}
        >
          {resumeInfo?.jobTitle}
        </h2>

        <div className='flex justify-between'>
          <h2 className='font-normal text-xs' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.phone}</h2>
          <h2 className='font-normal text-xs' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.email}</h2>
        </div>
    </div>
  )
}

export default PersonalDetail