import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCrypto } from '../api';

const CryptoPage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await getAllCrypto();
        if (data && data.length > 0) {
          setCryptos(data);
        } else {
          setError('No cryptocurrencies found');
        }
      } catch (err) {
        setError('Failed to load cryptocurrencies');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0D]">
      <div className="bg-[#16181C] border-b border-[#23262B] p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">CryptoApp</Link>
          <div className="flex gap-4">
            <Link to="/profile" className="text-[#8A919E] hover:text-white">Profile</Link>
            <Link to="/crypto" className="text-white">Crypto</Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-white mb-6">All Cryptocurrencies</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

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
                  <td className={`p-4 text-right ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;
