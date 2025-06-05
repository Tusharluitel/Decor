import CommonContainer from "@/components/elements/CommonContainer";

const HeroSection: React.FC = () => {
  return (
    <>
      <div className="relative bg-[#1B365D] text-white">
        <CommonContainer>
          <div className=" grid md:grid-cols-2 grid-cols-1 gap-8 lg:py-16 py-8 ">
            <div className="space-y-6 lg:py-8 ">
              <h1 className="lg:text-5xl text-4xl font-bold md:text-left text-center">
                Elevate your space and brand{" "}
                <span className="text-[#FFA500]">With Expert Designs</span>
              </h1>
              <p className="lg:text-lg md:text-left text-center">
                Whether you want to elevate your home, office, or commercial
                space with stunning decor or boost your brand visibility with
                premium advertising materials, we have the perfect solutions
                tailored to your needs.
              </p>
              {/* <button className="bg-[#FFA500] text-white px-8 py-3 rounded-md hover:bg-[#FF8C00] transition">
                  Get Started
                </button> */}
            </div>
            <div className="relative">
              <div className="absolute inset-0  opacity-20"></div>
              <img src="/images/hero.png" alt="Interior Design Showcase" />
            </div>
          </div>
        </CommonContainer>
      </div>
    </>
  );
};

export default HeroSection;
