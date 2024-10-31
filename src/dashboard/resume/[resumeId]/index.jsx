import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../componets/FormSection';
import ResumePreView from '../componets/ResumePreView';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../../../services/GlobalApi';

const EditResume = () => {
  debugger;
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  useEffect(() => {
    if (resumeId) {  // Check if resumeId is defined
      GetResumeInfo();
    } else {
      console.error("Resume ID is undefined");
    }
  }, [resumeId]); 

  const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(resumeId).then(resp=>{
      console.log(resp.data.data)
      setResumeInfo(resp.data.data)
    })
  }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreView />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume