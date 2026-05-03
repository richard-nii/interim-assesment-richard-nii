import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCrypto } from '../api';

const AddCryptoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    price: '',
    image: '',
    change24h: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const cryptoData = {
        name: formData.name,
        symbol: formData.symbol,
        price: parseFloat(formData.price),
        image: formData.image,
        change24h: parseFloat(formData.change24h)
      };

      const result = await addCrypto(cryptoData);

      if (result && result._id) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/crypto');
        }, 1500);
      } else {
        setError(result?.message || 'Failed to add cryptocurrency');
      }
    } catch (err) {
      setError('Failed to add cryptocurrency');
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Add Cryptocurrency</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm">Cryptocurrency added! Redirecting...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#16181C] rounded-xl p-6 border border-[#23262B]">
          <div className="mb-4">
            <label className="block text-[0.875rem] font-medium text-white mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Bitcoin"
              required
              className="w-full h-12 px-4 rounded-xl bg-[#1E2025] border border-[#2C2F36] text-white placeholder:text-[#5B616E] text-[0.9375rem] outline-none focus:border-[#0052FF] transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[0.875rem] font-medium text-white mb-1.5">Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="BTC"
              required
              className="w-full h-12 px-4 rounded-xl bg-[#1E2025] border border-[#2C2F36] text-white placeholder:text-[#5B616E] text-[0.9375rem] outline-none focus:border-[#0052FF] transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[0.875rem] font-medium text-white mb-1.5">Price (USD)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="45000"
              step="0.01"
              required
              className="w-full h-12 px-4 rounded-xl bg-[#1E2025] border border-[#2C2F36] text-white placeholder:text-[#5B616E] text-[0.9375rem] outline-none focus:border-[#0052FF] transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[0.875rem] font-medium text-white mb-1.5">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              className="w-full h-12 px-4 rounded-xl bg-[#1E2025] border border-[#2C2F36] text-white placeholder:text-[#5B616E] text-[0.9375rem] outline-none focus:border-[#0052FF] transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[0.875rem] font-medium text-white mb-1.5">24h Change (%)</label>
            <input
              type="number"
              name="change24h"
              value={formData.change24h}
              onChange={handleChange}
              placeholder="2.5"
              step="0.01"
              required
              className="w-full h-12 px-4 rounded-xl bg-[#1E2025] border border-[#2C2F36] text-white placeholder:text-[#5B616E] text-[0.9375rem] outline-none focus:border-[#0052FF] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.name || !formData.symbol || !formData.price}
            className={`w-full h-12 rounded-full font-semibold text-[0.9375rem] transition-colors
              ${isLoading || !formData.name || !formData.symbol || !formData.price
                ? 'bg-[#1E2025] text-[#5B616E] cursor-not-allowed'
                : 'bg-[#3B4DE0] hover:bg-[#2F3FC0] active:bg-[#2535A0] text-white cursor-pointer'
              }`}
          >
            {isLoading ? 'Adding...' : 'Add Cryptocurrency'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCryptoPage;
