import React from 'react';
import './PrevEditions.css'; // Import custom CSS

function PrevEditions() {
  // Array of cards data for reusability
  const cardData = [
    {
      id: 1,
      image: "/poster1.svg",
      title: "Previous Webathon",
      description: "This is some dummy text about the previous webathon edition. It was a great success with many participants from around the world. The event featured amazing speakers and innovative projects.",
      version: "1.0"
    },
    {
      id: 2,
      image: "/poster2.svg",
      title: "Previous Webathon",
      description: "The second edition brought together developers and designers in a 48-hour coding marathon. Participants created innovative solutions for real-world problems and networked with industry professionals.",
      version: "2.0"
    }
  ];

  return (
    <div className="cards-wrapper">
      {cardData.map(card => (
        <div className="card-container" key={card.id}>
          {/* Default state: Full image */}
          <div className="card-image">
          <img
              src={card.image}
              alt={`Webathon ${card.version} Edition`}
              onError={(e) => {
                console.error(`Error loading edition image: ${card.image}`);
                e.target.src = "/fallback-edition.png"; // Provide a fallback image
              }}
            />

          </div>
         
          {/* Hover state: Content only */}
          <div className="card-hover-content">
            <div className="card-hover-text">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            
            {/* Vertical letter-by-letter "WEBATHON" with version text */}
            <div className="vertical-text-container">
              {'WEBATHON'.split('').map((letter, index) => (
                <div className="vertical-letter" key={index}>{letter}</div>
              ))}
              {card.version.split('').map((char, index) => (
                <div className="vertical-letter version-char" key={`ver-${index}`}>{char}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrevEditions;