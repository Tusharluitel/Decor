'use client'
import PublicView from '@/views/PublicView';
import { Home, Phone, Mail, MapPin, Award, Users, Clock, Building } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { APP_BASE_URL } from '@/lib/constants';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    setIsLoading(true);

    const formDataToSend = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value as string);
    });

    try {
      const response = await fetch(`${APP_BASE_URL}/api/public/contact/store`, {
        method: 'POST',
        headers: {
          Accept : 'Application/json'
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      toast({
        title: 'Message Sent!',
        description: data.message,
        variant: 'success',
      });

      // Reset form on success
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicView>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="p-3 border rounded focus:border-[#FFA500] outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="p-3 border rounded focus:border-[#FFA500] outline-none"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:border-[#FFA500] outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:border-[#FFA500] outline-none"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:border-[#FFA500] outline-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#FFA500] text-white px-8 py-3 rounded hover:bg-[#FF8C00] transition disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
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
    </PublicView>
  );
};

export default ContactPage;