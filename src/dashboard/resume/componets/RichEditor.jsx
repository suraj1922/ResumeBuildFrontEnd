import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from '../../../../services/AIModel';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle}, Based on the position title, give me 4-5 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me the result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI = async () => {
        if (!resumeInfo?.experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }

        setLoading(true);
        
        // Dynamically insert the title into the prompt
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
        
        try {
            const result = await AIChatSession.sendMessage(prompt);
            const resp = await result.response.text();
            
            // Remove unwanted characters []{} from the response
            const cleanResp = resp.replace(/[\[\]\{\}]/g, '').trim()

            setValue(cleanResp);
        } catch (error) {
            console.error("Error generating summary:", error);
            toast('Failed to generate summary.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary"
                >
                    {loading ? (
                        <LoaderCircle className='animate-spin' />
                    ) : (
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    )}
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <HtmlButton />
                        <Separator />
                        <BtnStyles />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor;
