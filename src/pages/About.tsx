
import { Users, Target, Trophy, Globe } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Marco Rossi",
      role: "President",
      description: "MSc Finance, Former Goldman Sachs Intern"
    },
    {
      name: "Sofia Chen",
      role: "Vice President",
      description: "MSc Data Science, Bloomberg Research Team"
    },
    {
      name: "Alessandro Bianchi",
      role: "Head of Research",
      description: "PhD Candidate in Mathematical Finance"
    },
    {
      name: "Giulia Martini",
      role: "Events Coordinator",
      description: "MSc Economics, Former JPMorgan Analyst"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Our Association</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Founded in 2018, the Bocconi Quantitative Finance Association has become the leading student organization 
            bridging the gap between academic excellence and industry practice in quantitative finance.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We strive to create a community where ambitious students can develop the quantitative skills, 
                professional networks, and practical experience needed to excel in the rapidly evolving world of finance.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Through cutting-edge research, industry partnerships, and hands-on learning experiences, 
                we prepare our members for leadership roles in investment banking, hedge funds, asset management, 
                and fintech companies.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Quantitative Research</span>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Risk Management</span>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Algorithmic Trading</span>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Financial Engineering</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">Pursuing the highest standards in quantitative finance education</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Building lasting connections between students and professionals</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Achievement</h3>
                <p className="text-gray-600 text-sm">Celebrating success in competitions and career placements</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Global Impact</h3>
                <p className="text-gray-600 text-sm">Creating leaders who shape the future of global finance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the passionate students leading our association forward</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-32"></div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Proud moments that define our journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-l-4 border-blue-600 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2023 European Quant Challenge</h3>
              <p className="text-gray-600 mb-2">1st Place Winner</p>
              <p className="text-sm text-gray-500">Our team developed a revolutionary market-making algorithm that outperformed 50+ European universities</p>
            </div>
            
            <div className="bg-white border-l-4 border-blue-600 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CFA Institute Recognition</h3>
              <p className="text-gray-600 mb-2">Official Partnership</p>
              <p className="text-sm text-gray-500">Recognized as a CFA Institute University Affiliation Program member for academic excellence</p>
            </div>
            
            <div className="bg-white border-l-4 border-blue-600 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Collaboration</h3>
              <p className="text-gray-600 mb-2">25+ Partner Firms</p>
              <p className="text-sm text-gray-500">Strategic partnerships with leading banks, hedge funds, and fintech companies</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
