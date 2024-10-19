import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalApi from '../../services/GlobalApi';
import ResumeItem from '../dashboard/components/ResumeItem'
import { useUser } from '@clerk/clerk-react';
const Dashboard = () => {
  const {user}=useUser();
  const [resumeList, setResumeList] = useState([])
  useEffect(()=>{
    user&&GetResumesList()
  },[user])

  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      setResumeList(resp.data.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-2xl'>My Resume</h2>
      <p>Start Creating AI resume for your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume/>
        {resumeList.length>0&&resumeList.map((resume,index)=>(
          <ResumeItem resume={resume} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard