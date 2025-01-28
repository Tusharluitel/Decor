import CommonContainer from "@/components/elements/CommonContainer";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const AppFooter : React.FC = () => {
  return (
    <>
      <footer className="bg-[#1B365D] text-white py-16">
        <CommonContainer>
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Decorsign</h3>
              <p className="text-gray-300">
                Creating beautiful spaces that inspire and delight since 2010.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <div className="space-y-2">
                <Link href="#" className="block hover:text-[#FFA500]">
                  Interior Design
                </Link>
                <Link href="#" className="block hover:text-[#FFA500]">
                  Space Planning
                </Link>
                <Link href="#" className="block hover:text-[#FFA500]">
                  Decor Consultation
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="#" className="block hover:text-[#FFA500]">
                  Portfolio
                </Link>
                <Link href="#" className="block hover:text-[#FFA500]">
                  About Us
                </Link>
                <Link href="#" className="block hover:text-[#FFA500]">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Facebook className="hover:text-[#FFA500] cursor-pointer" />
                <Twitter className="hover:text-[#FFA500] cursor-pointer" />
                <Instagram className="hover:text-[#FFA500] cursor-pointer" />
                <Youtube className="hover:text-[#FFA500] cursor-pointer" />
              </div>
            </div>
          </div>
        </CommonContainer>
      </footer>
    </>
  );
};

export default AppFooter
