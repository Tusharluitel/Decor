import CommonContainer from "@/components/elements/CommonContainer"
import { Home, Mail, Phone } from "lucide-react"

const ContactSection : React.FC = () => {
  return(
    <>
      <CommonContainer>
        <div className="py-16">
          <div className="flex gap-16 max-w-fit mx-auto justify-even">
            <div>
              <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Get In Touch</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-3 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
                <textarea placeholder="Message" rows={4} className="w-full p-3 border rounded"></textarea>
                <button className="bg-[#FFA500] text-white px-8 py-3 rounded hover:bg-[#FF8C00] transition">
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Contact Info</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Home className="text-[#FFA500]" />
                  <p>123 Design Street, Creative City</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-[#FFA500]" />
                  <p>+1 234 567 890</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-[#FFA500]" />
                  <p>info@decorsign.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonContainer>
    </>
  )
}

export default ContactSection