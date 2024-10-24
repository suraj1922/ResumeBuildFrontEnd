import React from 'react'
import { useState } from 'react'
import PersonalDetail from './Preview/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import PersonalDetails from './form/PersonalDetails'
import Summary from '@/dashboard/resume/componets/form/Summary'
import Experience from '@/dashboard/resume//componets/form/Experience'
import Education from '@/dashboard/resume/componets/form/Education'
import Skills from '@/dashboard/resume/componets/form/Skills'
const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false)

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid />Theme</Button>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)} className=""><ArrowLeft /></Button>}
          <Button
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}>Next<ArrowRight /></Button>
        </div>
      </div>

      {/* Personal Detail */}
      {activeFormIndex == 1 ?
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
        : activeFormIndex == 2 ?
        <Summary enableNext={(v) => setEnableNext(v)} />
        : activeFormIndex == 3 ?
        <Experience />
        : activeFormIndex == 4 ?
        <Education/>
        : activeFormIndex == 5 ?
        <Skills/>
        : nullS
      }

      {/* Experience */}

      {/* Educational Details */}

      {/* Skills */}
    </div>
  )
}

export default FormSection