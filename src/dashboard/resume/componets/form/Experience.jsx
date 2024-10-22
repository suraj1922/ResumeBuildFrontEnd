import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Editor from 'react-simple-wysiwyg';
import RichEditor from '../RichEditor';
const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
}

const Experience = () => {

    const [experienceList, setExperienceList] = useState([
        formField
    ])

    const handleChange = (index, event) => {

    }

    const AddNewExperience=()=>{
        setExperienceList([...experienceList,formField])
    }
    const RemoveExperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your Previous Job Experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.title}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.companyName} />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.city} />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.state}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate} />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type="date" name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div>
                               <div className='col-span-2'>
                                <RichEditor/>
                               </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                    <Button variant="outline" className="text-primary" onClick={AddNewExperience}>+ Add More Experience</Button>
                    <Button variant="outline" className="text-primary" onClick={RemoveExperience}>- Remove</Button>
                    </div>
                    <Button>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default Experience