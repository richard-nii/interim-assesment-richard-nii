import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGainers } from '../api';

const Gainers = () => {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
    const fetchGainers = async () => {
      try {
        const data = await getGainers();
        if (Array.isArray(data)) {
          setCryptos(data);
        } else {
          setError('No cryptocurrencies found');
        }
      } catch (err) {
        setError('Failed to fetch gainers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGainers();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D]">
      {/* Header */}
      <div className="bg-[#16181C] border-b border-[#23262B] p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">CryptoApp</Link>
          <Link to="/profile" className="text-[#0052FF] hover:underline">Profile</Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Top Gainers</h1>
        <p className="text-[#8A919E] mb-6">Cryptocurrencies with the highest 24h price increase</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="bg-[#16181C] rounded-xl border border-[#23262B] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0A0B0D]">
                <tr>
                  <th className="text-left p-4 text-[#8A919E] font-medium">Name</th>
                  <th className="text-left p-4 text-[#8A919E] font-medium">Symbol</th>
                  <th className="text-right p-4 text-[#8A919E] font-medium">Price</th>
                  <th className="text-right p-4 text-[#8A919E] font-medium">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((crypto) => (
                  <tr key={crypto._id} className="border-t border-[#23262B]">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {crypto.image && (
                          <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                        )}
                        <span className="text-white font-medium">{crypto.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[#8A919E]">{crypto.symbol}</td>
                    <td className="p-4 text-right text-white">{formatPrice(crypto.price)}</td>
                    <td className="p-4 text-right text-green-400 font-semibold">
                      +{crypto.change24h}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link 
            to="/crypto"
            className="bg-[#16181C] rounded-xl p-6 border border-[#23262B] hover:border-[#0052FF] transition text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-2">All Cryptos</h3>
            <p className="text-[#8A919E] text-sm">Browse all cryptocurrencies</p>
          </Link>
          
          <Link 
            to="/crypto/new"
            className="bg-[#16181C] rounded-xl p-6 border border-[#23262B] hover:border-[#0052FF] transition text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-2">New Listings</h3>
            <p className="text-[#8A919E] text-sm">Recently added cryptocurrencies</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gainers;
