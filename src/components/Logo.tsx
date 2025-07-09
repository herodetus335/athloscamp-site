import React from 'react';

interface LogoProps {
  className?: string;
  textColor?: string;
  iconColor?: string;
  filterWhite?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "h-8 w-8", 
  textColor = "text-gray-900", 
  iconColor = "text-orange-500",
  filterWhite = false
}) => {
  return (
    <div className="flex items-center space-x-3">
      <img 
        src="/athloslogopng.png" 
        alt="Athlos Fitness Camp Logo" 
        className={`${className} object-contain`} style={filterWhite ? { filter: 'brightness(0) invert(1)' } : {}}
      />
      <span className={`text-xl font-bold ${textColor}`}>
        Athlos Fitness Camp
      </span>
    </div>
  );
};

export default Logo;