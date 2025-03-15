import React, { useState } from 'react';

const TestimonialCard = ({ name, designation, content, index, isMiddle }) => {
  const [isHovered, setIsHovered] = useState(false);
 
  // Get first letter of name for the avatar
  const firstLetter = name.charAt(0).toUpperCase();
 
  // Changed to a darker gray for better contrast on dark background
  const avatarColor = 'bg-gray-600';
 
  let borderColor = 'border-gray-700';
  let shadowClass = '';
  

  const bgColor = 'bg-gray-900';
 
  if (isMiddle) {
    borderColor = isHovered ? 'border-white' : 'border-gray-600';
    shadowClass = isHovered ? 'shadow-lg shadow-white/20' : '';
  } else {
    borderColor = isHovered ? 'border-gray-700' : 'border-gray-800';
    shadowClass = isHovered ? 'shadow-lg' : '';
  }
 
  return (
    <div
      className={`${bgColor} border ${borderColor} rounded-3xl p-4 md:p-6 text-white min-w-[200px] md:min-w-[250px] max-w-[300px] sm:max-w-[400px] md:max-w-[530px] h-full
      transition-all duration-300 ${shadowClass}
      font-['DM_Sans',sans-serif]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 md:gap-6">
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden ${avatarColor} flex items-center justify-center text-white font-bold text-base md:text-lg flex-shrink-0`}>
          {firstLetter}
        </div>
        <div>
          <p className="font-bold text-base md:text-lg text-white">{name}</p>
          <p className="text-gray-400 text-xs md:text-sm">{designation}</p>
        </div>
      </div>
     
      <div className="mt-3 md:mt-4">
        <p className="text-gray-300 text-sm sm:text-base md:text-lg">{content}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;