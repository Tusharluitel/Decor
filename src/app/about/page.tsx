import React from 'react';
import { Home, Phone, Mail, MapPin, Award, Users, Clock, Building } from 'lucide-react';
import CommonContainer from '@/components/elements/CommonContainer';
import PublicView from '@/views/PublicView';



const AboutPage = () => (
  <PublicView>
  <div className="min-h-screen bg-white">
    {/* About Hero Section */}
    <div className="bg-[#1B365D] text-white py-16">
      <CommonContainer>
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg">Creating beautiful spaces since 2010</p>
      </CommonContainer>
    </div>

    {/* Our Story */}
      <CommonContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
          <div>
            <h2 className="text-3xl font-bold text-[#1B365D] mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2010, Decorsign has grown from a small design studio to a full-service interior design firm. 
              Our passion for creating beautiful, functional spaces has driven us to complete over 500 successful projects 
              across residential and commercial sectors.
            </p>
            <p className="text-gray-600">
              We believe that great design has the power to transform spaces and enhance lives. Our team of experienced 
              designers works closely with each client to understand their unique needs and preferences, creating 
              customized solutions that exceed expectations.
            </p>
          </div>
          <div>
            <img src="/api/placeholder/600/400" alt="Our Story" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </CommonContainer>

    {/* Our Values */}
      <div className="bg-gray-50 py-16">
        <CommonContainer>
          <h2 className="text-3xl font-bold text-[#1B365D] mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {icon: Award, title: 'Excellence', desc: 'Commitment to delivering exceptional quality in every project'},
              {icon: Users, title: 'Collaboration', desc: 'Working closely with clients to bring their vision to life'},
              {icon: Clock, title: 'Timeliness', desc: 'Respecting deadlines and delivering projects on schedule'},
              {icon: Building, title: 'Innovation', desc: 'Embracing new design trends and creative solutions'}
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <value.icon className="w-12 h-12 text-[#FFA500] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1B365D] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </CommonContainer>
      </div>
    </div>
  </PublicView>

    
);

export default AboutPage