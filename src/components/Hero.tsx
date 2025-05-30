import { Link } from 'react-router-dom';
import { Brain, TrendingUp, BarChart3 } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-hidden">
      {/* Skyscraper Background Image with Tint */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5760&q=80')`
        }}
      ></div>
      
      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 bg-blue-600 opacity-80"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left lg:pr-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Quantitative Finance
              <span className="block text-blue-600">Meets Innovation</span>
            </h1>
            <p className="max-w-2xl text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed">
              The first Bocconi student association to integrate quantitative methods with financial markets through cutting-edge coding tools and interdisciplinary research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/apply"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Join Our Community
              </Link>
              <Link
                to="/about"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Three Divisions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-blue-200 shadow-sm">
                <Brain className="mx-auto h-10 w-10 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI/ML</h3>
                <p className="text-gray-600 text-sm">Machine learning applications in capital markets</p>
              </div>
              <div className="text-center bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-blue-200 shadow-sm">
                <BarChart3 className="mx-auto h-10 w-10 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantitative Research</h3>
                <p className="text-gray-600 text-sm">Research publications and backtesting strategies</p>
              </div>
              <div className="text-center bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-blue-200 shadow-sm">
                <TrendingUp className="mx-auto h-10 w-10 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Capital Markets</h3>
                <p className="text-gray-600 text-sm">Algorithmic trading and financial forecasting</p>
              </div>
            </div>
          </div>

          {/* Right Content - Central Skyscraper Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-t from-blue-900 via-blue-700 to-sky-400 rounded-lg shadow-2xl relative overflow-hidden">
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
                <div className="absolute top-8 right-8 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Milan
                </div>
                <div className="absolute top-20 left-8 bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  London
                </div>
                <div className="absolute bottom-32 right-6 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
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
