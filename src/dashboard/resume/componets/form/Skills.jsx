import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../../services/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Skills = () => {
    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0,
    }])
    const [loading, setLoading] = useState(false)
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const {resumeId} = useParams()
    const handlerChange = (index, name, value) => {
        const newEntries=skillsList.slice();
        newEntries[index][name]=value;
        console.log(newEntries)
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name: '',
            rating:0
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

   const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error, Try again!')
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
    return (

        <div >
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Skills</h2>
                <p>Add Your Top professional Key Skills</p>
                <div>
                    {skillsList.map((item, index) => (
                        <div className='flex justify-between border rounded-lg p-3 mb-2' key={index}>
                            <div>
                                <label htmlFor="" className='text-sm'>Name</label>
                                <Input className="w-full" onChange={(e) => handlerChange(index, 'name', e.target.value)}></Input>
                            </div>
                            <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handlerChange(index, 'rating', v)}></Rating>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
                        <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Skills