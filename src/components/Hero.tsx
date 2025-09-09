
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, BarChart3, Briefcase, MessageSquare } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-brand-secondary via-amber-50 to-brand-secondary overflow-hidden">
      {/* Skyscraper Background Image with Tint */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/da6baa84-0ef8-4b72-949a-14544c161c04.png')`
        }}
      ></div>
      
      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 bg-brand-primary opacity-70"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
        <div className="text-center lg:text-left">
          {/* Main Content */}
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-gloock text-brand-secondary mb-6 leading-tight">
              Quantitative Finance
                <span className="block text-white">Meets Innovation</span>
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-xl sm:text-2xl font-gowun text-gray-200 mb-8 leading-relaxed">
              The first Bocconi student association to integrate quantitative methods with financial markets through cutting-edge coding tools and interdisciplinary research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScWvrCy3SdDtJuMCow2eCqWgmUmr5jYjrvhZtD3ov60mi38CQ/viewform?usp=sharing&ouid=108960923037342736970r"
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
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-brand-secondary shadow-sm">
                  <Brain className="mx-auto h-12 w-12 text-brand-accent mb-4" />
                  <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">AI/ML</h3>
                  <p className="text-gray-600 font-gowun">Machine learning applications in capital markets</p>
                </div>
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-brand-secondary shadow-sm">
                  <BarChart3 className="mx-auto h-12 w-12 text-brand-accent mb-4" />
                  <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Quantitative Research</h3>
                  <p className="text-gray-600 font-gowun">Research publications and backtesting strategies</p>
                </div>
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-brand-secondary shadow-sm">
                  <TrendingUp className="mx-auto h-12 w-12 text-brand-accent mb-4" />
                  <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Capital Markets</h3>
                  <p className="text-gray-600 font-gowun">Algorithmic trading and financial forecasting</p>
                </div>
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-brand-secondary shadow-sm">
                  <Briefcase className="mx-auto h-12 w-12 text-brand-accent mb-4" />
                  <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Portfolio Management</h3>
                  <p className="text-gray-600 font-gowun">Strategic asset allocation and risk management</p>
                </div>
              </div>
              
              {/* Communications - Side positioned */}
              <div className="flex justify-center lg:justify-start lg:mt-12">
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-brand-secondary shadow-sm w-full max-w-sm">
                  <MessageSquare className="mx-auto h-12 w-12 text-brand-accent mb-4" />
                  <h3 className="text-xl font-semibold font-gloock text-brand-primary mb-3">Communications</h3>
                  <p className="text-gray-600 font-gowun">Content creation and community engagement</p>
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
