import { Home, Phone, Mail, MapPin, Award, Users, Clock, Building } from 'lucide-react';

const ContactPage = () => (
  <div className="min-h-screen bg-white">
    {/* Contact Hero Section */}
    <div className="bg-[#1B365D] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg">Let's discuss your next design project</p>
      </div>
    </div>

    {/* Contact Content */}
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#1B365D] mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="First Name" 
                className="p-3 border rounded focus:border-[#FFA500] outline-none"
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                className="p-3 border rounded focus:border-[#FFA500] outline-none"
              />
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-3 border rounded focus:border-[#FFA500] outline-none"
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="w-full p-3 border rounded focus:border-[#FFA500] outline-none"
            />
            <textarea 
              placeholder="Your Message" 
              rows={6}
              className="w-full p-3 border rounded focus:border-[#FFA500] outline-none"
            ></textarea>
            <button className="bg-[#FFA500] text-white px-8 py-3 rounded hover:bg-[#FF8C00] transition">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <MapPin className="text-[#FFA500]" />
                <div>
                  <h3 className="font-bold">Visit Us</h3>
                  <p>123 Design Street, Creative City, ST 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-[#FFA500]" />
                <div>
                  <h3 className="font-bold">Call Us</h3>
                  <p>+1 234 567 890</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-[#FFA500]" />
                <div>
                  <h3 className="font-bold">Email Us</h3>
                  <p>info@decorsign.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-6">Business Hours</h2>
            <div className="space-y-2">
              <p><span className="font-bold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
              <p><span className="font-bold">Saturday:</span> 10:00 AM - 4:00 PM</p>
              <p><span className="font-bold">Sunday:</span> Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage