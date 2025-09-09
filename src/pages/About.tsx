
import { Users, Target, Trophy, Globe, Brain, TrendingUp, BarChart3, Briefcase } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Lorenzo Giambra",
      role: "President",
      description: "BEMACS, 3rd Year",
      picture: "lovable-uploads/WhatsApp Image 2025-06-30 at 21.02.50.jpeg"
    },
    {
      name: "Andrea Leporati",
      role: "Vice President",
      description: "BIEM, 3rd Year",
      picture: "lovable-uploads/WhatsApp Image 2025-06-30 at 21.02.50 (1).jpeg"
    },
    {
      name: "Demir Elmas",
      role: "Co-Head of ML/AI Division",
      description: "BEMACS, 3rd Year",
      picture: "lovable-uploads/WhatsApp Image 2025-06-30 at 21.03.53.jpeg"
    },
    {
      name: "Apostolos Dedeloudis",
      role: "Co-Head of ML/AI Division",
      description: "BEMACS, 3rd Year",
      picture: "lovable-uploads/WhatsApp Image 2025-06-30 at 21.02.50 (2).jpeg"
    },
    {
      name: "Andrei Alexandru Sofronie",
      role: "Co-Head of ML/AI Division",
      description: "BEMACS, 3rd Year",
      picture: "lovable-uploads/WhatsApp Image 2025-06-30 at 21.02.50 (3).jpeg"
    },
    {
      name: "Davide Costa",
      role: "Head of Quant Division",
      description: "BEMACS, 3rd Year",
      picture: "lovable-uploads/WhatsApp Image 2025-06-30 at 21.02.50 (6).jpeg"
    },
    {
      name: "Massimo Biavardi",
      role: "Head of Capital Markets",
      description: "BIEF, 3rd Year",
      picture: "lovable-uploads/WhatsApp Image 2025-06-30 at 21.02.50 (4).jpeg"
    },
    {
      name: "Giacomo Cordella",
      role: "Head of Digital",
      description: "BEMACS, 3rd Year",
      picture: "lovable-uploads/WhatsApp Image 2025-06-30 at 21.02.50 (5).jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-gowun">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-accent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold font-gloock text-white mb-6">About Our Association</h1>
          <p className="text-xl text-brand-secondary max-w-4xl mx-auto leading-relaxed">
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
              <h2 className="text-4xl font-bold font-gloock text-brand-primary mb-8">Our Vision & Mission</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  While Bocconi hosts several finance and tech related associations, none currently emphasize 
                  the integration of capital markets analysis with advanced quantitative tools from statistics, 
                  econometrics, and artificial intelligence.
                </p>
                <p>
                  Our association stands out by structuring its activities into four vertical divisions: 
                  <span className="font-semibold text-brand-accent"> AI/ML, Quantitative Research, Capital Markets, and Portfolio Management</span>, 
                  adopting cutting-edge strategies in backtesting, algorithmic trading, financial forecasting, and strategic asset allocation.
                </p>
                <p>
                  We translate quantitative and qualitative financial skills into hands-on experience, 
                  preparing members for careers in quantitative finance through a uniquely career-oriented 
                  and enriching environment focused on technical execution.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-brand-secondary p-4 rounded-lg mb-2">
                    <Brain className="h-8 w-8 text-brand-primary mx-auto" />
                  </div>
                  <span className="text-sm font-medium text-brand-primary font-gloock">AI/ML</span>
                </div>
                <div className="text-center">
                  <div className="bg-brand-secondary p-4 rounded-lg mb-2">
                    <BarChart3 className="h-8 w-8 text-brand-primary mx-auto" />
                  </div>
                  <span className="text-sm font-medium text-brand-primary font-gloock">Quant Research</span>
                </div>
                <div className="text-center">
                  <div className="bg-brand-secondary p-4 rounded-lg mb-2">
                    <TrendingUp className="h-8 w-8 text-brand-primary mx-auto" />
                  </div>
                  <span className="text-sm font-medium text-brand-primary font-gloock">Capital Markets</span>
                </div>
                <div className="text-center">
                  <div className="bg-brand-secondary p-4 rounded-lg mb-2">
                    <Briefcase className="h-8 w-8 text-brand-primary mx-auto" />
                  </div>
                  <span className="text-sm font-medium text-brand-primary font-gloock">Portfolio Management</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-brand-primary p-6 rounded-lg text-center border border-brand-accent">
                <div className="bg-brand-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold font-gloock text-white mb-2">Technical Excellence</h3>
                <p className="text-brand-secondary text-sm">Focus on hands-on coding and quantitative model development</p>
              </div>
              <div className="bg-brand-primary p-6 rounded-lg text-center border border-brand-accent">
                <div className="bg-brand-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold font-gloock text-white mb-2">Community</h3>
                <p className="text-brand-secondary text-sm">Interdisciplinary collaboration between finance and technology</p>
              </div>
              <div className="bg-brand-primary p-6 rounded-lg text-center border border-brand-accent">
                <div className="bg-brand-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold font-gloock text-white mb-2">Competition</h3>
                <p className="text-brand-secondary text-sm">Virtual trading competitions backed by quantitative models</p>
              </div>
              <div className="bg-brand-primary p-6 rounded-lg text-center border border-brand-accent">
                <div className="bg-brand-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold font-gloock text-white mb-2">Industry Impact</h3>
                <p className="text-brand-secondary text-sm">Real-world applications through industry partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-secondary to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
        <h2 className="text-4xl font-bold font-gloock text-brand-primary mb-4">What We Do</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our activities span across major financial centers, connecting Milan with global markets.
        </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="cursor-pointer transition transform hover:scale-105 hover:shadow-2xl bg-white border-l-4 border-brand-accent p-8 rounded-r-lg">
          <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Virtual Trading Simulations</h3>
          <p className="text-gray-600 mb-3">
            Conduct advanced trading competitions backed by quantitative models, simulating real market conditions 
            across global exchanges from London to Hong Kong.
          </p>
          <div className="text-sm text-brand-accent font-medium">Focus: Algorithmic Trading & Strategy Development</div>
        </div>
        
        <div className="cursor-pointer transition transform hover:scale-105 hover:shadow-2xl bg-white border-l-4 border-brand-primary p-8 rounded-r-lg">
          <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Research Publications</h3>
          <p className="text-gray-600 mb-3">
            Publish cutting-edge research in quantitative finance, contributing to academic discourse 
            and practical applications in financial markets.
          </p>
          <div className="text-sm text-brand-primary font-medium">Focus: Academic Excellence & Innovation</div>
        </div>
        
        <div className="cursor-pointer transition transform hover:scale-105 hover:shadow-2xl bg-white border-l-4 border-brand-accent p-8 rounded-r-lg">
          <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Machine Learning Applications</h3>
          <p className="text-gray-600 mb-3">
            Develop AI-powered models for market prediction, risk assessment, and automated decision-making 
            in capital markets environments.
          </p>
          <div className="text-sm text-brand-accent font-medium">Focus: AI/ML Integration in Finance</div>
        </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-gloock text-brand-primary mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the passionate students leading our association forward</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={member.picture} alt={member.name} className="object-cover h-32 mx-auto" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-2">{member.name}</h3>
                  <p className="text-brand-accent font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Partnership Section */}
      <section className="py-20 bg-gradient-to-br from-brand-secondary to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-gloock text-brand-primary mb-4">QFA × Industry Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We aspire to collaborate with boutiques and financial institutions to comprehend firsthand 
              how quantitative trading models are applied to real-world investment strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-brand-accent">
              <div className="bg-brand-primary h-16 w-16 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl font-gloock">B</span>
              </div>
              <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Boutique Firms</h3>
              <p className="text-gray-600">
                Partner with specialized quantitative trading firms to understand cutting-edge strategies 
                and risk management techniques used in professional environments.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-brand-accent">
              <div className="bg-brand-accent h-16 w-16 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl font-gloock">I</span>
              </div>
              <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Investment Banks</h3>
              <p className="text-gray-600">
                Collaborate with major financial institutions to gain insights into institutional-grade 
                quantitative models and algorithmic trading platforms.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-brand-accent">
              <div className="bg-brand-secondary h-16 w-16 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-brand-primary font-bold text-xl font-gloock">T</span>
              </div>
              <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Tech Companies</h3>
              <p className="text-gray-600">
                Work with fintech companies and technology providers to explore the latest tools 
                and platforms for quantitative analysis and automated trading.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
