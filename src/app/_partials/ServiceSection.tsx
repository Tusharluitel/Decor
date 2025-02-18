'use client'
import CommonContainer from "@/components/elements/CommonContainer"
import { defaultFetcher } from "@/helpers/fetch.helper"
import { APP_BASE_URL } from "@/lib/constants"
import { routes } from "@/lib/routes"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"

const ServiceSection : React.FC = () => {
  const { data : ServiceData } = useSWR(`${APP_BASE_URL}/api/operations/list` , defaultFetcher);
  console.log(ServiceData)
  return(
    <>
      <CommonContainer>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Our Services</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {ServiceData?.data?.length> 0 && ServiceData?.data?.map((service : any, i : number) => (
              <Link key={i} className="bg-white rounded-lg shadow-lg overflow-hidden" href={`${routes.OPERATIONS_INDIVIDUAL.replace(':id' , service?.id)}`}>
                <div className="relative h-64 w-full">
                  <Image src={service?.image_path} alt={service.title} className="object-cover object-center " fill />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1B365D] mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CommonContainer>
    </>
  )
}

export default ServiceSection