import PublicView from "@/views/PublicView"
import HeroSection from "./_partials/HeroSection"
import ServiceSection from "./_partials/ServiceSection"
import ContactSection from "./_partials/ContactSection"

const LandingPage : React.FC = () => {
  return(
    <>
      <PublicView>
        
        <HeroSection />
        <ServiceSection />
        <ContactSection />
      </PublicView>
    </>
  )
}

export default LandingPage