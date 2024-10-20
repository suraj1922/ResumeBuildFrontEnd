import React, { useContext } from 'react'
import PersonalDetail from './Preview/PersonalDetail'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import ResumeSummary from './Preview/ResumeSummary';
import ProfessionalExp from './Preview/ProfessionalExp';

const ResumePreView = () => {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{borderColor:resumeInfo?.themeColor}}>
        {/* Personal Details */}
        <PersonalDetail resumeInfo={resumeInfo}/>
        {/* Summary */}
        <ResumeSummary resumeInfo={resumeInfo}/>
        {/* Professional Experience */}
        <ProfessionalExp/>
        {/* Educational */}

        {/* Skills */}
    </div>
  )
}

export default ResumePreView