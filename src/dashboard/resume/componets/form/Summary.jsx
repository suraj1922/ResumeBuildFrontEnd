import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../services/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from '../../../../../services/AIModel';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

function Summery({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(resumeInfo?.summery || ''); // Initialize with existing summary
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery
            })
        }
    }, [summery, resumeInfo, setResumeInfo]);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log("Generated Prompt:", PROMPT);

        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            console.log("AI Response:", result.response.text());

            const response = result.response.text();
            const parsedData = JSON.parse(response);

            if (Array.isArray(parsedData)) {
                setAiGenerateSummeryList(parsedData);
            } else {
                toast.error('AI response is not in array format');
                setAiGenerateSummeryList([]);
            }
        } catch (error) {
            console.error("Error generating summary:", error);
            toast.error('Error generating summary');
            setAiGenerateSummeryList([]);
        }
        setLoading(false);
    };

    const onSave = (e) => {
        e.preventDefault();

        setLoading(true)
        const data = {
            data: {
                summery: summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp);
            enableNext(true); // Enable next step after saving
            setLoading(false);
            toast("Details updated")
        }, (error) => {
            setLoading(false);
            toast.error('Failed to update details');
        })
    }

    const handleExperienceClick = (item) => {
        // Update the textbox with the selected summary
        setSummery(item?.summery); // Update state with clicked item's summary
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summery</h2>
                <p>Add Summery for your job title</p>
                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summery</label>
                        <Button variant="outline" onClick={() => GenerateSummeryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' /> Generate from AI</Button>
                    </div>
                    <Textarea className="mt-5 [h-250px]" required
                        value={summery}
                        onChange={(e) => setSummery(e.target.value)} // Bind state to textarea
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList?.length > 0 && (
                <div className="my-5">
                    <h2 className="font-bold text-lg">Suggestions</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div key={index} onClick={() => handleExperienceClick(item)} className="p-5 shadow-lg my-4 rounded-lg cursor-pointer">
                            <h2 className="font-bold my-1 text-primary">Level: {item?.experience_level}</h2>
                            <p>{item?.summery}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summery;
