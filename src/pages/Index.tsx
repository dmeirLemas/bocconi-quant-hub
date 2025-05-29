
import Hero from '../components/Hero';
import { Calendar, Target, Award, Briefcase } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join QFA?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our association provides unparalleled opportunities for students passionate about quantitative finance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Weekly Workshops</h3>
              <p className="text-gray-600">Expert-led sessions on derivatives pricing, risk management, and algorithmic trading</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trading Competitions</h3>
              <p className="text-gray-600">Participate in inter-university trading competitions and case studies</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Recognition</h3>
              <p className="text-gray-600">Build your profile with certifications and recognition from leading financial institutions</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Opportunities</h3>
              <p className="text-gray-600">Direct recruitment opportunities with top-tier investment banks and hedge funds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">150+</div>
              <div className="text-white text-lg">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-white text-lg">Industry Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-white text-lg">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">€85k</div>
              <div className="text-white text-lg">Average Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Join the Future of Finance?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Applications are open for the Spring 2024 semester. Don't miss your chance to be part of Italy's most prestigious quantitative finance community.
          </p>
          <a
            href="/apply"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            Start Your Application
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
