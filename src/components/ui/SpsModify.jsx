import React from 'react';
import './sponstyles.css';

function SpsModify() {
  const handleSponsorClick = () => {
    window.open('https://www.agilent.com', '_blank');
    console.log("Sponsor clicked");
  };

  return (
    <div className=' relative z-0 text-white'>
      <div className="max-w-4xl mx-auto px-4 w-full mb-6">
        <div className="sponsor-row">
          <div className='sponsor-image-box' onClick={handleSponsorClick}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7A0zzL2RQ_M2Cex2d-TafVUudRP1dTb69Ig&s"
              className="sponsor-img"
              alt="Sponsor"
            />
            <div className="sponsor-hover-text">Sponsor1</div>
          </div>
          
          <div className='sponsor-content text-center md:text-left'>
            <h2 className="text-4xl font-mono tracking-wider mb-3 text-indigo-400">SPONSORED BY</h2>
            <p className="text-gray-400 max-w-2xl mx-auto md:mx-0 mb-2">
              We're proud to partner with these amazing organizations that make our work possible.
            </p>
            <p className="text-gray-400">
              Supporting innovation and excellence through valuable partnerships
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpsModify;