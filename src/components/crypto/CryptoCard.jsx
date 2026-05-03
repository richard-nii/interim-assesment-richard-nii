import { Link } from 'react-router-dom';
import Card from '../common/Card';

const CryptoCard = ({ crypto }) => {
  const isPositive = crypto.change24h >= 0;

  return (
    <Link to={`/asset/${crypto.id}`}>
      <Card hover className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <img 
              src={crypto.image} 
              alt={crypto.name}
              className="w-8 h-8"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/32?text=${crypto.symbol}`;
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{crypto.name}</h3>
            <p className="text-sm text-gray-500">{crypto.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">
            ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default CryptoCard;

