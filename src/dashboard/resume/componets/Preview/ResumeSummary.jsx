import React from 'react'

const ResumeSummary = ({resumeInfo}) => {
  return (
    <p className='text-xs'>
        {resumeInfo?.summery}
    </p>
  )
}

export default ResumeSummary