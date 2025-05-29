
import { Link } from 'react-router-dom';
import { TrendingUp, Users, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Bocconi Quantitative
            <span className="block text-yellow-400">Finance Association</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-200 mb-8">
            Where finance meets mathematics. Join Italy's premier student-led quantitative finance community at Università Bocconi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/apply"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Apply Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <TrendingUp className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Quantitative Trading</h3>
            <p className="text-gray-200">Learn algorithmic trading strategies and market microstructure analysis</p>
          </div>
          <div className="text-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <BookOpen className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Research & Analytics</h3>
            <p className="text-gray-200">Conduct cutting-edge research in financial mathematics and risk management</p>
          </div>
          <div className="text-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <Users className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Professional Network</h3>
            <p className="text-gray-200">Connect with industry professionals and leading quant firms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
