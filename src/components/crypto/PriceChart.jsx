import { useState } from 'react';

const PriceChart = ({ currentPrice, change24h }) => {
  const [timeRange, setTimeRange] = useState('24H');
  const isPositive = change24h >= 0;

  // Generate mock chart data
  const generateChartData = () => {
    const data = [];
    let price = currentPrice;
    const points = 50;
    const volatility = currentPrice * 0.02;
    
    for (let i = 0; i < points; i++) {
      price = price + (Math.random() - 0.5) * volatility;
      data.push(price);
    }
    // Ensure last point matches current price
    data[data.length - 1] = currentPrice;
    return data;
  };

  const chartData = generateChartData();
  const minPrice = Math.min(...chartData);
  const maxPrice = Math.max(...chartData);
  const range = maxPrice - minPrice;

  const timeRanges = ['24H', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <div className="bg-white rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-500 text-sm">Current Price</p>
          <h2 className="text-3xl font-bold text-gray-900">
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change24h.toFixed(2)}% (24h)
          </p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-2 mb-6">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64 relative">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPositive ? '#16a34a' : '#dc2626'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? '#16a34a' : '#dc2626'} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d={`
              M 0 ${((maxPrice - chartData[0]) / range) * 256}
              ${chartData.map((price, i) => 
                `L ${(i / (chartData.length - 1)) * 100}% ${((maxPrice - price) / range) * 256}`
              ).join(' ')}
              L 100% 256
              L 0 256
              Z
            `}
            fill="url(#chartGradient)"
          />
          
          {/* Line */}
          <path
            d={`
              M 0 ${((maxPrice - chartData[0]) / range) * 256}
              ${chartData.map((price, i) => 
                `L ${(i / (chartData.length - 1)) * 100}% ${((maxPrice - price) / range) * 256}`
              ).join(' ')}
            `}
            fill="none"
            stroke={isPositive ? '#16a34a' : '#dc2626'}
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Price range labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>${minPrice.toFixed(2)}</span>
        <span>${maxPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceChart;

