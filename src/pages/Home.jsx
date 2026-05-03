import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import CryptoCard from '../components/crypto/CryptoCard';
import { cryptoData } from '../data/mockData';

const Home = () => {
  const featuredCryptos = cryptoData.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                Jump start your crypto portfolio
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Create your <span className="text-blue-600">crypto</span> portfolio today
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Coinbase is the easiest place to buy and sell cryptocurrency. Sign up and get started today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
                </Link>
                <Link to="/explore">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">View Pricing</Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  $268B+
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100M+
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  190+
                </div>
              </div>
            </div>

            {/* Right - Featured Crypto Cards */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {cryptoData.slice(0, 4).map((crypto) => (
                  <Link key={crypto.id} to={`/asset/${crypto.id}`}>
                    <Card className="p-4 hover:shadow-xl transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={crypto.image} 
                            alt={crypto.name}
                            className="w-8 h-8"
                            onError={(e) => { e.target.src = `https://via.placeholder.com/32?text=${crypto.symbol}`; }}
                          />
                          <span className="font-semibold text-gray-900">{crypto.symbol}</span>
                        </div>
                        <span className={`text-sm font-medium ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Table Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular cryptocurrencies</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-500">Asset</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-500">Price</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-500">Change</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-500 hidden md:table-cell">Market Cap</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-500 hidden lg:table-cell">Volume (24h)</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {featuredCryptos.map((crypto, index) => (
                    <tr key={crypto.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400 w-6">{index + 1}</span>
                          <img 
                            src={crypto.image} 
                            alt={crypto.name}
                            className="w-8 h-8"
                            onError={(e) => { e.target.src = `https://via.placeholder.com/32?text=${crypto.symbol}`; }}
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{crypto.name}</p>
                            <p className="text-sm text-gray-500">{crypto.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-6 font-semibold text-gray-900">
                        ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className={`text-right py-4 px-6 font-medium ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </td>
                      <td className="text-right py-4 px-6 text-gray-600 hidden md:table-cell">
                        ${(crypto.marketCap / 1e9).toFixed(2)}B
                      </td>
                      <td className="text-right py-4 px-6 text-gray-600 hidden lg:table-cell">
                        ${(crypto.volume24h / 1e9).toFixed(2)}B
                      </td>
                      <td className="text-right py-4 px-6">
                        <Link to={`/asset/${crypto.id}`}>
                          <Button variant="outline" size="sm">Trade</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/explore" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center">
              View all cryptocurrencies
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Earn Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Earn up to $41 worth of crypto</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl">
            Discover how specific cryptocurrencies work — and get a little owned to try it out.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cryptoData.slice(0, 3).map((crypto) => (
              <Link key={crypto.id} to={`/asset/${crypto.id}`}>
                <Card hover className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={crypto.image} 
                        alt={crypto.name}
                        className="w-10 h-10"
                        onError={(e) => { e.target.src = `https://via.placeholder.com/40?text=${crypto.symbol}`; }}
                      />
                      <span className="font-semibold">{crypto.name}</span>
                      <span className="text-gray-400">{crypto.symbol}</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-2">Earn $10</p>
                  <p className="text-blue-100 text-sm">Learn and earn</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Create your cryptocurrency portfolio today</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Coinbase has a variety of features that make it the best place to start trading
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Manage your portfolio</h3>
              <p className="text-gray-600">Buy and sell popular digital currencies. Keep track of them in the one place.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vault protection</h3>
              <p className="text-gray-600">For added security, store your funds in a vault with time-delayed withdrawals.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile apps</h3>
              <p className="text-gray-600">Stay on top of the markets with the Coinbase app for Android or iOS.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Insurance protection</h3>
              <p className="text-gray-600">All crypto held online is insured from breach or theft by Coinbase policy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learn Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Learn more about crypto</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">
            Get started with these guides on the basics and advanced topics
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/learn">
              <Card hover className="h-full">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-blue-600 text-sm font-medium">Beginner's guide</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">What is Bitcoin?</h3>
                <p className="text-gray-600">The world's most popular cryptocurrency explained.</p>
              </Card>
            </Link>
            
            <Link to="/learn">
              <Card hover className="h-full">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="text-purple-600 text-sm font-medium">Technology</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">What is Ethereum?</h3>
                <p className="text-gray-600">The leading blockchain for decentralized applications.</p>
              </Card>
            </Link>
            
            <Link to="/learn">
              <Card hover className="h-full">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-green-600 text-sm font-medium">Security</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">Crypto Security</h3>
                <p className="text-gray-600">Best practices for keeping your crypto safe.</p>
              </Card>
            </Link>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/learn">
              <Button variant="outline" size="lg">View All Guides</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start your journey today
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join millions of users and start buying, selling, and trading cryptocurrency on the world's most trusted platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">Create Account</Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800">
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

export default Home;

