import React, { useContext } from 'react'
import PersonalDetail from './Preview/PersonalDetail'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';

const ResumePreView = () => {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{borderColor:resumeInfo?.themeColor}}>
        {/* Personal Details */}
        <PersonalDetail resumeInfo={resumeInfo}/>
        {/* Summary */}

        {/* Professional Experience */}

        {/* Educational */}

        {/* Skills */}
    </div>
  )
}

export default ResumePreView