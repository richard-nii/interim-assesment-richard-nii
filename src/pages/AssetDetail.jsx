import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import PriceChart from '../components/crypto/PriceChart';
import { cryptoData } from '../data/mockData';

const AssetDetail = () => {
  const { id } = useParams();
  const crypto = cryptoData.find(c => c.id === id);

  if (!crypto) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cryptocurrency not found</h1>
          <Link to="/explore" className="text-blue-600 hover:text-blue-700">
            ← Back to Explore
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isPositive = crypto.change24h >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/explore" className="text-blue-600 hover:text-blue-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Explore
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <img 
                  src={crypto.image} 
                  alt={crypto.name}
                  className="w-10 h-10"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/40?text=${crypto.symbol}`;
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{crypto.name}</h1>
                <p className="text-gray-500">{crypto.symbol}</p>
              </div>
            </div>

            {/* Price Chart */}
            <PriceChart currentPrice={crypto.price} change24h={crypto.change24h} />

            {/* Description */}
            <Card>
              <h2 className="text-xl font-bold mb-4">About {crypto.name}</h2>
              <p className="text-gray-600 leading-relaxed">{crypto.description}</p>
            </Card>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card>
              <div className="mb-4">
                <p className="text-gray-500 text-sm">Current Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}% (24h)
                </p>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full">Buy {crypto.symbol}</Button>
                <Button variant="outline" className="w-full">Sell {crypto.symbol}</Button>
              </div>
            </Card>

            {/* Stats */}
            <Card>
              <h3 className="font-bold text-lg mb-4">Market Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Market Cap</span>
                  <span className="font-semibold">
                    ${(crypto.marketCap / 1e9).toFixed(2)}B
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">24h Volume</span>
                  <span className="font-semibold">
                    ${(crypto.volume24h / 1e9).toFixed(2)}B
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">24h Change</span>
                  <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rank</span>
                  <span className="font-semibold">#{cryptoData.findIndex(c => c.id === id) + 1}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AssetDetail;

