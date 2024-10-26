import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../../services/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Skills = () => {
    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0,
    }]);
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();

    useEffect(() => {
        if (resumeInfo?.skills && Array.isArray(resumeInfo.skills)) {
            setSkillsList(resumeInfo.skills);
        }
    }, [resumeInfo]);

    const handlerChange = (index, name, value) => {
        const newEntries = [...skillsList]; // Make a copy of the array
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList(prevSkills => [
            ...prevSkills,
            {
                name: '',
                rating: 0
            }
        ]);
    };

    const RemoveSkills = () => {
        setSkillsList(prevSkills => prevSkills.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest)
            }
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                console.log(resp);
                setLoading(false);
                toast('Details updated!');
            })
            .catch(error => {
                setLoading(false);
                toast('Server Error, Try again!');
                console.error("Error updating skills:", error);
            });
    };

    useEffect(() => {
        setResumeInfo(prevInfo => ({
            ...prevInfo,
            skills: skillsList
        }));
    }, [skillsList]);

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Skills</h2>
                <p>Add Your Top Professional Key Skills</p>
                <div>
                    {skillsList?.map((item, index) => (
                        <div className='flex justify-between border rounded-lg p-3 mb-2' key={index}>
                            <div>
                                <label htmlFor="" className='text-sm'>Name</label>
                                <Input className="w-full" onChange={(e) => handlerChange(index, 'name', e.target.value)} defaultValue={item.name} />
                            </div>
                            <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handlerChange(index, 'rating', v)} />
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
                        <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Skills;
