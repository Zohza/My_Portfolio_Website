import React from 'react'
import StarBackground from '../Components/StarBackground'
import NavBar from '../Components/NavBar'
import HeroSection from '../Components/HeroSection'
import AboutMe from '../Components/AboutMe'
import SkillsSection from '../Components/SkillsSection'
import ProjectsSection from '../Components/ProjectsSection'
import GetInTouch from '../Components/GetInTouch'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <div>

       
         

           {/* Background Effect */}
           <StarBackground />


           
           {/* NavBar */}
           <NavBar />

           {/* Main Content */}
           <main>
           <HeroSection />
           <AboutMe />
           <SkillsSection />
           <ProjectsSection />
           <GetInTouch />


           </main>
           {/* footer */}
           <Footer />

     
    </div>
  )
}

export default Home