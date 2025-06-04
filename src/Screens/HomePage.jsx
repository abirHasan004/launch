import { useState } from 'react'

 
import LLCForm from "../components/LLCFormation.jsx";
import LLCIncluded from '../components/LLCIncluded.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import LLCFeaturesSection from '../components/LLCFeatures.jsx'
import Footer from '../components/Footer.jsx'
import ThreeStepSection from '../components/ThreeStepSection.jsx'
 import {Box} from '@mui/material'
function HomePage() {
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

export default HomePage
