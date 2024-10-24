import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../services/GlobalApi'
const Education = () => {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const {params} = useParams
    const [educationalList, setEdcationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: '',
        }
    ])

    const handleChange = (event, index) => {
        const newEntries=educationalList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        console.log(newEntries)
        setEdcationalList(newEntries); 
    }


    const AddNewEducation = () => {
        setEdcationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: '',
        }])
    }

    const RemoveEducation = () => {
        setEdcationalList(educationalList=>educationalList.slice(0,-1))
    }

    const onSave = () => {
        setLoading(true)
        const data={
            data:{
                education:educationalList
            }
        }
        GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated!')
        },(error)=>{
            setLoading(false);
            toast('Error updating details')
        })

    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationalList
        })
    },[educationalList])
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Education</h2>
                <p>Add Your Educational Details</p>

                <div>
                    {educationalList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div className='col-span-2'>
                                    <label htmlFor="">University Name</label>
                                    <Input name='universityName'onChange={(e) => handleChange(e, index)}></Input>
                                </div>
                                <div>
                                    <label htmlFor="">Degree</label>
                                    <Input name='degree' onChange={(e) => handleChange(e, index)}></Input>
                                </div>
                                <div>
                                    <label htmlFor="">Major</label>
                                    <Input name='major' onChange={(e) => handleChange(e, index)}></Input>
                                </div>
                                <div>
                                    <label htmlFor="">Start Date</label>
                                    <Input type="date" name='startDate' onChange={(e) => handleChange(e, index)}></Input>
                                </div>
                                <div>
                                    <label htmlFor="">End Date</label>
                                    <Input type="date" name='endDate' onChange={(e) => handleChange(e, index)}></Input>
                                </div>
                                <div className='col-span-2'>
                                    <label htmlFor="">Description</label>
                                    <Textarea name='description' onChange={(e) => handleChange(e, index)}></Textarea>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
                        <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Education