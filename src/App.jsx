import { useState } from 'react'
import { Button } from '@/'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Button>Click me</Button>
      </div>
    </>
  )
}

export default App
