import React from 'react'
import { useState } from 'react'
import PersonalDetail from './Preview/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight , LayoutGrid} from 'lucide-react'
import PersonalDetails from './form/PersonalDetails'
const FormSection = () => {
  const [activeFormIndex,setActiveFormIndex] = useState(2);
  const [enableNext,setEnableNext] =useState(false)
  
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid />Theme</Button>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex>1&&<Button size="sm" onClick={()=>setActiveFormIndex(activeFormIndex-1)}className=""><ArrowLeft/></Button>}
          <Button 
          disabled={!enableNext} 
          className="flex gap-2" size="sm"
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}>Next<ArrowRight /></Button>
        </div>
      </div>

      {/* Personal Detail */}
      {activeFormIndex==1?<PersonalDetails  enableNext={(v)=>setEnableNext(v)}/>:null}
      {/* Summary */}

      {/* Experience */}

      {/* Educational Details */}

      {/* Skills */}
    </div>
  )
}

export default FormSection