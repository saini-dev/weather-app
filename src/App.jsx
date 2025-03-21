import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Project from './pages/Project'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Project />
    </div>
  )
}

export default App
