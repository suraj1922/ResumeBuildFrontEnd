import { Description } from '@radix-ui/react-dialog'
import { University } from 'lucide-react'
import React, { useState } from 'react'

const Education = () => {

    const [educationalList, setEdcationalList] = useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:'',
        }
    ])
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Education</h2>
                <p>Add Your Educational Details</p>
            </div>
        </div>
    )
}

export default Education