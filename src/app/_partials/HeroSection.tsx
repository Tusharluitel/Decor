import CommonContainer from "@/components/elements/CommonContainer"

const HeroSection : React.FC = () => {
  return(
    <>
      <div className="relative bg-[#1B365D] text-white">
        <CommonContainer>
          <div className=" grid md:grid-cols-2 grid-cols-1 gap-8 py-16">
              <div className="space-y-6 py-8">
                <h1 className="text-5xl font-bold">Transform Your Space<br/><span className="text-[#FFA500]">With Expert Design</span></h1>
                <p className="text-lg">Creating beautiful, functional spaces that reflect your unique style and personality</p>
                <button className="bg-[#FFA500] text-white px-8 py-3 rounded-md hover:bg-[#FF8C00] transition">
                  Get Started
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[#FFA500] opacity-20 rounded-lg"></div>
                <img src="/api/placeholder/600/400" alt="Interior Design Showcase" className="rounded-lg shadow-lg" />
              </div>
          </div>
        </CommonContainer>
      </div>
    </>
  )
}

export default HeroSection