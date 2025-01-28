import CommonContainer from "@/components/elements/CommonContainer"
import { routes } from "@/lib/routes"
import Image from "next/image"
import Link from "next/link"

const AppHeader : React.FC = () => {
  return(
    <>
      <header>
        <nav className="bg-[#1B365D]/0.7 text-white p-4">
          <CommonContainer>
            <div className="flex justify-between items-center">
              <Link href={routes.LANDING_INDEX}>
                <Image src={'/Decorsign.png'} alt="decorsign" width={150} height={150} className="w-[100px] h-[70px] object-contain" />
              </Link>
              <div className="text-2xl font-bold">DECORSIGN</div>
              <div className="space-x-6">
                <Link href={routes.LANDING_INDEX} className="hover:text-[#FFA500] text-[#1B365D]">Home</Link>
                <Link href={routes.ABOUT_INDEX} className="hover:text-[#FFA500] text-[#1B365D]">About</Link>
                <Link href={routes.CATEGORY_INDEX} className="hover:text-[#FFA500] text-[#1B365D]">Categories</Link>
                <Link href={routes.CONTACT_INDEX} className="hover:text-[#FFA500] text-[#1B365D]">Contact</Link>
              </div>
            </div>
          </CommonContainer>
        </nav>
      </header>
    </>
  )
}

export default AppHeader