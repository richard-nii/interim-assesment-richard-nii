import { Link } from 'react-router-dom';

const CryptoRow = ({ crypto, index }) => {
  const isPositive = crypto.change24h >= 0;

  return (
    <Link 
      to={`/asset/${crypto.id}`}
      className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
    >
      <div className="flex items-center space-x-4 min-w-[200px]">
        <span className="text-gray-400 w-6">{index + 1}</span>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <img 
            src={crypto.image} 
            alt={crypto.name}
            className="w-6 h-6"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/24?text=${crypto.symbol}`;
            }}
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{crypto.name}</h3>
          <p className="text-sm text-gray-500">{crypto.symbol}</p>
        </div>
      </div>

      <div className="text-right min-w-[120px]">
        <p className="font-semibold text-gray-900">
          ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      <div className="text-right min-w-[100px]">
        <p className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
        </p>
      </div>

      <div className="text-right min-w-[150px] hidden md:block">
        <p className="text-gray-900">
          ${(crypto.marketCap / 1e9).toFixed(2)}B
        </p>
      </div>

      <div className="text-right min-w-[150px] hidden md:block">
        <p className="text-gray-900">
          ${(crypto.volume24h / 1e9).toFixed(2)}B
        </p>
      </div>
    </Link>
  );
};

export default CryptoRow;

