
import { Users, Target, Trophy, Globe, Brain, TrendingUp, BarChart3 } from 'lucide-react';

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
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Our Association</h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Bocconi Students Quantitative Finance is the first Bocconi association to conceive quantitative finance 
            in its broadest sense, creating a unique interdisciplinary student community focused on the application 
            of quantitative methods to financial markets through cutting-edge coding tools.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Vision & Mission</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  While Bocconi hosts several finance and tech related associations, none currently emphasize 
                  the integration of capital markets analysis with advanced quantitative tools from statistics, 
                  econometrics, and artificial intelligence.
                </p>
                <p>
                  Our association stands out by structuring its activities into three vertical divisions: 
                  <span className="font-semibold text-blue-600"> AI/ML, Quantitative Research, and Capital Markets</span>, 
                  adopting cutting-edge strategies in backtesting, algorithmic trading, and financial forecasting.
                </p>
                <p>
                  We translate quantitative and qualitative financial skills into hands-on experience, 
                  preparing members for careers in quantitative finance through a uniquely career-oriented 
                  and enriching environment focused on technical execution.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-lg mb-2">
                    <Brain className="h-8 w-8 text-blue-600 mx-auto" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">AI/ML</span>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-lg mb-2">
                    <BarChart3 className="h-8 w-8 text-blue-600 mx-auto" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Quant Research</span>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-lg mb-2">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Capital Markets</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-100">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Technical Excellence</h3>
                <p className="text-gray-600 text-sm">Focus on hands-on coding and quantitative model development</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-100">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Interdisciplinary collaboration between finance and technology</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-100">
                <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Competition</h3>
                <p className="text-gray-600 text-sm">Virtual trading competitions backed by quantitative models</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-100">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Industry Impact</h3>
                <p className="text-gray-600 text-sm">Real-world applications through industry partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">QFA × Industry Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We aspire to collaborate with boutiques and financial institutions to comprehend firsthand 
              how quantitative trading models are applied to real-world investment strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
              <div className="bg-blue-600 h-16 w-16 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Boutique Firms</h3>
              <p className="text-gray-600">
                Partner with specialized quantitative trading firms to understand cutting-edge strategies 
                and risk management techniques used in professional environments.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
              <div className="bg-sky-600 h-16 w-16 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Investment Banks</h3>
              <p className="text-gray-600">
                Collaborate with major financial institutions to gain insights into institutional-grade 
                quantitative models and algorithmic trading platforms.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
              <div className="bg-blue-700 h-16 w-16 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tech Companies</h3>
              <p className="text-gray-600">
                Work with fintech companies and technology providers to explore the latest tools 
                and platforms for quantitative analysis and automated trading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our activities span across major financial centers, connecting Milan with global markets 
              in London, New York, Hong Kong, and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Virtual Trading Simulations</h3>
              <p className="text-gray-600 mb-3">
                Conduct advanced trading competitions backed by quantitative models, simulating real market conditions 
                across global exchanges from London to Hong Kong.
              </p>
              <div className="text-sm text-blue-600 font-medium">Focus: Algorithmic Trading & Strategy Development</div>
            </div>
            
            <div className="bg-sky-50 border-l-4 border-sky-600 p-8 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Research Publications</h3>
              <p className="text-gray-600 mb-3">
                Publish cutting-edge research in quantitative finance, contributing to academic discourse 
                and practical applications in financial markets.
              </p>
              <div className="text-sm text-sky-600 font-medium">Focus: Academic Excellence & Innovation</div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-700 p-8 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Machine Learning Applications</h3>
              <p className="text-gray-600 mb-3">
                Develop AI-powered models for market prediction, risk assessment, and automated decision-making 
                in capital markets environments.
              </p>
              <div className="text-sm text-blue-700 font-medium">Focus: AI/ML Integration in Finance</div>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Milestones that showcase our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-l-4 border-blue-600 p-6 shadow-lg rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Inaugural Research Publication</h3>
              <p className="text-gray-600 mb-2">First Student-Led Quantitative Study</p>
              <p className="text-sm text-gray-500">Published groundbreaking research on ML applications in European equity markets</p>
            </div>
            
            <div className="bg-white border-l-4 border-sky-600 p-6 shadow-lg rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Recognition</h3>
              <p className="text-gray-600 mb-2">Academic Excellence Award</p>
              <p className="text-sm text-gray-500">Recognized by Bocconi for innovative approach to quantitative finance education</p>
            </div>
            
            <div className="bg-white border-l-4 border-blue-700 p-6 shadow-lg rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Partnership Network</h3>
              <p className="text-gray-600 mb-2">15+ Industry Collaborations</p>
              <p className="text-sm text-gray-500">Established partnerships with leading quantitative trading firms and technology providers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
