
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, BarChart3, Briefcase, MessageSquare } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-brand-secondary via-amber-50 to-brand-secondary overflow-hidden">
      {/* Skyscraper Background Image with Tint */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5760&q=80')`
        }}
      ></div>
      
      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 bg-brand-primary opacity-70"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left lg:pr-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-gloock text-brand-secondary mb-6 leading-tight">
              Quantitative Finance
                <span className="block text-white">Meets Innovation</span>
            </h1>
            <p className="max-w-2xl text-xl sm:text-2xl font-gowun text-gray-200 mb-8 leading-relaxed">
              The first Bocconi student association to integrate quantitative methods with financial markets through cutting-edge coding tools and interdisciplinary research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="https://forms.google.com/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-accent hover:bg-brand-primary text-white font-semibold font-gowun px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Join Our Community
              </a>
              <Link
                to="/about"
                className="bg-brand-secondary hover:bg-amber-400 text-brand-primary font-semibold font-gowun px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Five Divisions */}
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 border border-brand-secondary shadow-sm">
                  <Brain className="mx-auto h-10 w-10 text-brand-accent mb-3" />
                  <h3 className="text-lg font-semibold font-gloock text-brand-primary mb-2">AI/ML</h3>
                  <p className="text-gray-600 font-gowun text-sm">Machine learning applications in capital markets</p>
                </div>
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 border border-brand-secondary shadow-sm">
                  <BarChart3 className="mx-auto h-10 w-10 text-brand-accent mb-3" />
                  <h3 className="text-lg font-semibold font-gloock text-brand-primary mb-2">Quantitative Research</h3>
                  <p className="text-gray-600 font-gowun text-sm">Research publications and backtesting strategies</p>
                </div>
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 border border-brand-secondary shadow-sm">
                  <TrendingUp className="mx-auto h-10 w-10 text-brand-accent mb-3" />
                  <h3 className="text-lg font-semibold font-gloock text-brand-primary mb-2">Capital Markets</h3>
                  <p className="text-gray-600 font-gowun text-sm">Algorithmic trading and financial forecasting</p>
                </div>
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 border border-brand-secondary shadow-sm">
                  <Briefcase className="mx-auto h-10 w-10 text-brand-accent mb-3" />
                  <h3 className="text-lg font-semibold font-gloock text-brand-primary mb-2">Portfolio Management</h3>
                  <p className="text-gray-600 font-gowun text-sm">Strategic asset allocation and risk management</p>
                </div>
              </div>
              
              {/* Communications - Centered to the side */}
              <div className="flex justify-center lg:w-auto">
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 border border-brand-secondary shadow-sm w-full sm:w-64">
                  <MessageSquare className="mx-auto h-10 w-10 text-brand-accent mb-3" />
                  <h3 className="text-lg font-semibold font-gloock text-brand-primary mb-2">Communications</h3>
                  <p className="text-gray-600 font-gowun text-sm">Content creation and community engagement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Central Skyscraper Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-t from-brand-primary via-brand-accent to-brand-secondary rounded-lg shadow-2xl relative overflow-hidden">
                {/* Skyscraper silhouette effect */}
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent opacity-80"></div>
                
                {/* Building windows effect */}
                <div className="absolute inset-0 grid grid-cols-8 gap-1 p-4">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`bg-yellow-200 opacity-${Math.random() > 0.6 ? '80' : '20'} rounded-sm`}
                    ></div>
                  ))}
                </div>

                {/* City skyline accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3">
                  <div className="flex items-end justify-center space-x-1 h-full px-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 opacity-70"
                        style={{
                          height: `${30 + Math.random() * 40}%`,
                          width: '8px'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-8 right-8 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-semibold font-gowun">
                  Milan
                </div>
                <div className="absolute top-20 left-8 bg-brand-secondary text-brand-primary px-3 py-1 rounded-full text-xs font-semibold font-gowun">
                  London
                </div>
                <div className="absolute bottom-32 right-6 bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-semibold font-gowun">
                  NYC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
