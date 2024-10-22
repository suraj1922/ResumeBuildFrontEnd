import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../services/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from '../../../../../services/AIModel';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"
const Summary = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const [summery, setSummery] = useState()
    const [loading, setLoading] = useState(false);
    const { params } = useParams();
    const [aiGeneratedSummeryList,setAiGeneratedSummeryList] = useState();

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        }, [summery])
    })

    const GenerateSummaryFromAi = async()=>{
        setLoading(true);
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
        console.log(PROMPT)
        const result= await AIChatSession.sendMessage(PROMPT)
        console.log(result.response.text());
        setAiGeneratedSummeryList(JSON.parse([result.response.text()]))
        setLoading(false);
    }

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data: {
                summery: summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            enableNext(true);
            setLoading(false);
            toast("Details Updated")
        }, (error) => {
            setLoading(false)
        })
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary Detail</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-start'>
                        <label>Add Summary</label>
                        <Button variant='outline' onClick={GenerateSummaryFromAi} size="sm" type='button' className="border-primary text-primary flex gap-2"><Brain className='h-4 w-4'/>Generate from AI</Button>
                    </div>
                    <Textarea className='mt-5 h-[150px]' required 
                        onChange={(e) => setSummery(e.target.value)}  />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit"
                            disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : 'Save'}</Button>
                    </div>
                </form>
            </div>
            
            {aiGeneratedSummeryList&&<div>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList.map((item,index)=>(
                    <div>
                        <h2 className='font-bold my-1 text-primary'>Level:{item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>    
                ))}
            </div>}
        </div>
    )
}

export default Summary  