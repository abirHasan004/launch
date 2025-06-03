import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LLCForm from "./components/LLCFormation.jsx";
import LLCIncluded from './components/LLCIncluded.jsx'
import TestimonialCarousel from './components/TestimonialCarousel.jsx'
import LLCFeaturesSection from './components/LLCFeatures.jsx'
import Footer from './components/Footer.jsx'
import ThreeStepSection from './components/ThreeStepSection.jsx'
import {Box} from '@mui/material'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Box sx={{p:0,minWidth:'100%'}}>
      <LLCForm/>
      <LLCIncluded/>
      <TestimonialCarousel/>
      <LLCFeaturesSection/>
      <ThreeStepSection/>
      <Footer/>
    </Box>
  )
}

export default App
