import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CryptoRow from '../components/crypto/CryptoRow';
import { cryptoData } from '../data/mockData';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('marketCap');

  const filteredCryptos = cryptoData
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'marketCap') return b.marketCap - a.marketCap;
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return b.change24h - a.change24h;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Cryptocurrencies
          </h1>
          <p className="text-xl text-gray-600">
            Browse and discover cryptocurrencies from around the world.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="marketCap">Market Cap</option>
                <option value="price">Price</option>
                <option value="change">24h Change</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Table */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table Header */}
          <div className="hidden md:flex items-center justify-between py-3 px-4 bg-gray-100 rounded-t-lg">
            <div className="flex items-center space-x-4 min-w-[200px]">
              <span className="text-gray-500 text-sm font-medium w-6">#</span>
              <span className="text-gray-500 text-sm font-medium">Name</span>
            </div>
            <div className="text-right min-w-[120px]">
              <span className="text-gray-500 text-sm font-medium">Price</span>
            </div>
            <div className="text-right min-w-[100px]">
              <span className="text-gray-500 text-sm font-medium">24h %</span>
            </div>
            <div className="text-right min-w-[150px]">
              <span className="text-gray-500 text-sm font-medium">Market Cap</span>
            </div>
            <div className="text-right min-w-[150px]">
              <span className="text-gray-500 text-sm font-medium">Volume (24h)</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white rounded-b-lg shadow-sm">
            {filteredCryptos.length > 0 ? (
              filteredCryptos.map((crypto, index) => (
                <CryptoRow key={crypto.id} crypto={crypto} index={index} />
              ))
            ) : (
              <div className="py-12 text-center text-gray-500">
                No cryptocurrencies found matching your search.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explore;

