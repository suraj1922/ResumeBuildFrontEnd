import React, { useEffect, useState } from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import ResumePreView from '@/dashboard/resume/componets/ResumePreView'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../services/GlobalApi'
import { useParams } from 'react-router-dom'
const ViewResume = () => {

    const { resumeInfo, setResumeInfo } = useState();
    const { resumeId } = useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])
    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data)
        })
    }
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <Header />
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <h2 className='text-center text-2xl font-medium'>Hey! Your Resume is Ready</h2>
                <p className='text-center text-gray-400'>Your resume is ready to Download and share you can chare ot with friends</p>
                <div className='flex justify-between px-44 my-10'>
                    <Button>Download</Button>
                    <Button>Share</Button>
                </div>
                <div>
                    <ResumePreView />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume