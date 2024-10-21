import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../services/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react';


const Summary = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const [summery, setSummery] = useState()
    const [loading, setLoading] = useState(false);
    const { params } = useParams();

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        }, [summery])
    })

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

                <from className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-start'>
                        <label>Add Summary</label>
                        <Button variant='outline' size="sm" type='button' className="border-primary text-primary flex gap-2"><Brain className='h-4 w-4'/>Generate from AI</Button>
                    </div>
                    <Textarea className='mt-5' required
                        onChange={(e) => setSummery(e.target.value)} />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit"
                            disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : 'Save'}</Button>
                    </div>
                </from>
            </div>
        </div>
    )
}

export default Summary