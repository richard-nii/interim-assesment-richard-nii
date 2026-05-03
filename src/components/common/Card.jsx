const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}) => {
  const paddingSizes = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const hoverStyles = hover 
    ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer' 
    : '';

  return (
    <div className={`bg-white rounded-xl shadow-md ${paddingSizes[padding]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;

