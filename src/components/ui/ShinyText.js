const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
      <div
          className={`relative inline-block font-tagline ${disabled ? '' : 'animate-shine'} ${className}`}
          style={{
              fontWeight: 'bold',
              backgroundImage: 'linear-gradient(120deg, #C0C0C0 20%, #8C6E48 40%,  #8C6E48 60%, #C0C0C0 80%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animationDuration: animationDuration,
          }}
      >
          {text}
      </div>
  );
};

export default ShinyText;
