'use client'
import CommonContainer from "@/components/elements/CommonContainer"
import { defaultFetcher } from "@/helpers/fetch.helper"
import { APP_BASE_URL } from "@/lib/constants"
import useSWR from "swr"

const ServiceSection : React.FC = () => {
  const { data : ServiceData } = useSWR(`${APP_BASE_URL}/api/operations/list` , defaultFetcher)
  return(
    <>
      <CommonContainer>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Our Services</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {title: 'Interior Design', desc: 'Complete interior design solutions for residential and commercial spaces'},
              {title: 'Space Planning', desc: 'Optimal space utilization and layout planning for maximum functionality'},
              {title: 'Decor Consultation', desc: 'Expert advice on furniture, colors, and accessories selection'},
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={`/api/placeholder/400/300`} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1B365D] mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CommonContainer>
    </>
  )
}

export default ServiceSection