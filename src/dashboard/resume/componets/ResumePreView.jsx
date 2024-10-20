import React, { useContext } from 'react'
import PersonalDetail from './Preview/PersonalDetail'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import ResumeSummary from './Preview/ResumeSummary';
import ProfessionalExp from './Preview/ProfessionalExp';
import EducationPreview from './Preview/EducationPreview';
import SkillsPreview from './Preview/SkillsPreview';

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
        <ProfessionalExp resumeInfo={resumeInfo}/>
        {/* Educational r*/}
        <EducationPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreView