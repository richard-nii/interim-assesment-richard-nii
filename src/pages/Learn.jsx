import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { learnArticles } from '../data/mockData';

const Learn = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn about cryptocurrency
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Everything you need to know about cryptocurrency, blockchain technology, and getting started with trading.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {['All', 'Getting Started', 'Technology', 'Security', 'Trading'].map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card hover className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto bg-gray-200">
                <img 
                  src={learnArticles[0].image} 
                  alt={learnArticles[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-blue-600 text-sm font-medium mb-2">
                  {learnArticles[0].category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {learnArticles[0].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  Get started with the world's most popular cryptocurrency. Learn about Bitcoin's history, technology, and how to get started.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {learnArticles[0].readTime}
                  </span>
                  <Button>Read More</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learnArticles.slice(1).map((article) => (
              <Card key={article.id} hover className="overflow-hidden p-0">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-blue-600 text-xs font-medium">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {article.readTime}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start trading?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Create an account and start your cryptocurrency journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="lg">Create Account</Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                Explore Cryptocurrencies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Learn;

