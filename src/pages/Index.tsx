
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { Calendar, Target, Award, Users, Code, TrendingUp, BookOpen, Briefcase } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* What Makes Us Unique Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Unique</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike other Bocconi associations, we focus on technical execution and hands-on experience, 
              bridging the gap between quantitative theory and real-world application.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-brand-primary/10 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-brand-accent/20">
              <div className="bg-brand-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Focus</h3>
              <p className="text-gray-600">Hands-on coding with Python, R, and advanced quantitative tools</p>
            </div>
            
            <div className="text-center bg-brand-primary/10 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-brand-accent/20">
              <div className="bg-brand-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Virtual Trading</h3>
              <p className="text-gray-600">Quantitative model-backed trading competitions and simulations</p>
            </div>
            
            <div className="text-center bg-brand-primary/10 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-brand-accent/20">
              <div className="bg-brand-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Research Publications</h3>
              <p className="text-gray-600">Contribute to cutting-edge research in quantitative finance</p>
            </div>
            
            <div className="text-center bg-brand-primary/10 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-brand-accent/20">
              <div className="bg-brand-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Collaboration</h3>
              <p className="text-gray-600">Direct partnerships with boutiques and financial institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Three Divisions */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Three Vertical Divisions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our activities are structured into specialized divisions, each focusing on different aspects of quantitative finance
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI/ML Division</h3>
              <p className="text-gray-600 mb-4">
                Apply artificial intelligence and machine learning techniques to capital markets analysis, 
                developing predictive models and automated trading strategies.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Neural networks for price prediction</li>
                <li>• NLP for sentiment analysis</li>
                <li>• Reinforcement learning for trading</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quantitative Research</h3>
              <p className="text-gray-600 mb-4">
                Conduct rigorous research using advanced statistical methods, econometrics, and mathematical modeling 
                to understand market dynamics and develop new trading strategies.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Backtesting frameworks</li>
                <li>• Statistical arbitrage models</li>
                <li>• Risk factor analysis</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Capital Markets</h3>
              <p className="text-gray-600 mb-4">
                Focus on algorithmic trading, financial forecasting, and market microstructure analysis 
                to understand how quantitative models perform in real market conditions.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• High-frequency trading strategies</li>
                <li>• Portfolio optimization</li>
                <li>• Derivatives pricing models</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Activities and Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Activities & Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gain hands-on experience through practical activities designed to prepare you for careers in quantitative finance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-xl border border-brand-accent/20">
              <Calendar className="h-12 w-12 text-brand-accent mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Virtual Trading Competitions</h3>
              <p className="text-gray-600">
                Participate in quantitative model-backed trading simulations that test your ability to apply 
                theoretical knowledge to real market scenarios.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-xl border border-brand-accent/20">
              <Briefcase className="h-12 w-12 text-brand-accent mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry Workshops</h3>
              <p className="text-gray-600">
                Learn from professionals at boutique firms and financial institutions about real-world 
                applications of quantitative trading models.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-xl border border-brand-accent/20">
              <BookOpen className="h-12 w-12 text-brand-accent mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Research Projects</h3>
              <p className="text-gray-600">
                Contribute to research publications and develop your own quantitative models with guidance 
                from experienced members and faculty.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-xl border border-brand-accent/20">
              <Award className="h-12 w-12 text-brand-accent mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Preparation</h3>
              <p className="text-gray-600">
                Build a strong foundation for careers in quantitative finance through practical experience 
                and industry connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-200 mb-2">50+</div>
              <div className="text-white text-lg">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-200 mb-2">15+</div>
              <div className="text-white text-lg">Industry Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-200 mb-2">25+</div>
              <div className="text-white text-lg">Research Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-200 mb-2">10+</div>
              <div className="text-white text-lg">Trading Competitions</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of Bocconi's first interdisciplinary quantitative finance association. 
            Gain hands-on experience, build industry connections, and prepare for an exciting career in quantitative finance.
          </p>
          <Link
            to="/apply"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            Start Your Application
          </Link>
        </div>
      </section> */}
    </div>
  );
};

export default Index;
