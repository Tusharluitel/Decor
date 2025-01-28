'use client'
import CommonContainer from "@/components/elements/CommonContainer"
import { routes } from "@/lib/routes"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AppHeader: React.FC = () => {
  const pathname = usePathname()

  // Function to determine if a link is active
  const isActive = (route: string) => {
    return pathname === route
  }

  return (
    <>
      <header>
        <nav className="bg-[#1B365D]/0.7 text-white p-4">
          <CommonContainer>
            <div className="flex justify-between items-center">
              <Link href={routes.LANDING_INDEX} className="relative w-[100px] h-[70px]">
                <Image src={'/Decorsign.png'} alt="decorsign" fill className=" object-contain" />
              </Link>
              <div className="space-x-6">
                <Link 
                  href={routes.LANDING_INDEX} 
                  className={`font-semibold hover:text-[#FFA500] ${isActive(routes.LANDING_INDEX) ? 'text-[#FFA500]' : 'text-[#1B365D]'}`}
                >
                  Home
                </Link>
                <Link 
                  href={routes.ABOUT_INDEX} 
                  className={`font-semibold hover:text-[#FFA500] ${isActive(routes.ABOUT_INDEX) ? 'text-[#FFA500]' : 'text-[#1B365D]'}`}
                >
                  About
                </Link>
                <Link 
                  href={routes.CONTACT_INDEX} 
                  className={`font-semibold hover:text-[#FFA500] ${isActive(routes.CONTACT_INDEX) ? 'text-[#FFA500]' : 'text-[#1B365D]'}`}
                >
                  Contact
                </Link>
              </div>
            </div>
          </CommonContainer>
        </nav>
      </header>
    </>
  )
}

export default AppHeader