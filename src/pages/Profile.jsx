import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile } from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchProfile = async () => {
      try {
        const result = await getProfile(token);
        if (result.success) {
          setUser(result.user);
        } else {
          localStorage.removeItem('token');
          navigate('/signin');
        }
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
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
      {/* Header */}
      <div className="bg-[#16181C] border-b border-[#23262B] p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">CryptoApp</Link>
          <button 
            onClick={handleLogout}
            className="text-[#8A919E] hover:text-white transition"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {user && (
          <div className="bg-[#16181C] rounded-xl p-6 border border-[#23262B]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#0052FF] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                <p className="text-[#8A919E]">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0B0D] rounded-lg p-4">
                <p className="text-[#8A919E] text-sm mb-1">Name</p>
                <p className="text-white font-medium">{user.name}</p>
              </div>
              <div className="bg-[#0A0B0D] rounded-lg p-4">
                <p className="text-[#8A919E] text-sm mb-1">Email</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to="/crypto"
            className="bg-[#16181C] rounded-xl p-6 border border-[#23262B] hover:border-[#0052FF] transition group"
          >
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0052FF] transition">All Cryptos</h3>
            <p className="text-[#8A919E] text-sm">Browse all available cryptocurrencies</p>
          </Link>
          
          <Link 
            to="/crypto/gainers"
            className="bg-[#16181C] rounded-xl p-6 border border-[#23262B] hover:border-[#0052FF] transition group"
          >
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0052FF] transition">Top Gainers</h3>
            <p className="text-[#8A919E] text-sm">View biggest price gainers</p>
          </Link>
          
          <Link 
            to="/crypto/new"
            className="bg-[#16181C] rounded-xl p-6 border border-[#23262B] hover:border-[#0052FF] transition group"
          >
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0052FF] transition">New Listings</h3>
            <p className="text-[#8A919E] text-sm">Recently added cryptocurrencies</p>
          </Link>
          
          <Link 
            to="/crypto/add"
            className="bg-[#16181C] rounded-xl p-6 border border-[#3B4DE0] hover:border-[#0052FF] hover:bg-[#1a1b1e] transition group"
          >
            <h3 className="text-lg font-semibold text-[#3B4DE0] mb-2 group-hover:text-[#0052FF] transition flex items-center gap-2">
               Add New Crypto
            </h3>
            <p className="text-[#8A919E] text-sm">Add your own cryptocurrency</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
