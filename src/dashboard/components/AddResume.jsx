import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../services/GlobalApi'
import { useUser } from '@clerk/clerk-react'
// import { title } from 'process'
// import { error } from 'console'

const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setresumeTile] = useState();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const onCreate = () => {
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }

        GlobalApi.CreateNewResume(data).then(resp => {
            console.log(resp)
            if (resp) {
                setLoading(false);
                navigator('/dashboard/resume/' + resp.data.data.document + "/edit")
            }
        }, (error) => {
            setLoading(false)
        })
    }

    return (
        <div>
            <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed ' onClick={() => setOpenDialog(true)}>
                <PlusSquare />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your new resume</p>
                            <Input className='my-2'
                                placeholder='Ex.Full Stack Resume'
                                onChange={(e) => setresumeTile(e.target.value)} />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={() => onCreate()}> {loading ? <Loader2 className='animate-spin' /> : 'Create'}</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddResume