import React from 'react'
import { useState } from 'react'
import { Home } from 'lucide-react'
import PersonalDetail from './Preview/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import PersonalDetails from './form/PersonalDetails'
import Summary from '@/dashboard/resume/componets/form/Summary'
import Experience from '@/dashboard/resume//componets/form/Experience'
import Education from '@/dashboard/resume/componets/form/Education'
import Skills from '@/dashboard/resume/componets/form/Skills'
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor'

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false)
  const {resumeId} = useParams()
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <Link to={"/dashboard"}>
            <Button><Home /></Button>
          </Link>
          <ThemeColor/>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)} className=""><ArrowLeft /></Button>}
          <Button
            disabled={enableNext}
            className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}>Next<ArrowRight /></Button>
        </div>
      </div>

      {/* Personal Detail */}
      {activeFormIndex == 1 ?
        <PersonalDetails />
        : activeFormIndex == 2 ?
          <Summary />
          : activeFormIndex == 3 ?
            <Experience />
            : activeFormIndex == 4 ?
              <Education />
              : activeFormIndex == 5 ?
                <Skills />
                : activeFormIndex == 6 ?
                <Navigate to={'/my-resume/'+resumeId+"/view"}/>
                :null
      }

      {/* Experience */}

      {/* Educational Details */}

      {/* Skills */}
    </div>
  )
}

export default FormSection