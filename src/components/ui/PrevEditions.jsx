import React from "react";
import "./PrevEditions.css"; // Import custom CSS

function PrevEditions() {
  // Array of cards data for reusability
  const cardData = [
    {
      id: 1,
      image: "/poster1.svg",
      title: "WEBATHON 2023",
      description: [
        "Open to 2nd-year students",
        "Round 1 - 24th March 2023",
        "Round 2 - 27th & 28th March 2023",
        "Teams of 4-5 members competed for a ₹10,000 prize pool",
        "Contacts:",
        "📞 G. Shravani: 6305228854",
        "📞 Shivesh Jaiswal: 7981348925",
      ],
      version: "1.0",
    },
    {
      id: 2,
      image: "/poster2.svg",
      title: "Webathon 2.0",
      description: [
        "Expanding to 2nd & 3rd-year students",
        "Theme - 'Connect. Collaborate. Create.'",
        "Round 1 - 2nd March 2024",
        "Round 2 - 22nd & 23rd March 2024",
        "Team - 4-5 member competing for an increased ₹15,000 prize pool",
        "Contacts:",
        "📞 N. Siddharth: 8897642106",
        "📞 K. Sahithi: 8074951188",
      ],
      version: "2.0",
    },
  ];

  return (
    <div className="cards-wrapper">
      {cardData.map((card) => (
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
              <ul className="pr-5 pl-2">
                {card.description.map((line) => (
                  <li className="mb-1" style={{ listStyle: "initial" }}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vertical letter-by-letter "WEBATHON" with version text */}
            <div className="vertical-text-container">
              {"WEBATHON".split("").map((letter, index) => (
                <div className="vertical-letter" key={index}>
                  {letter}
                </div>
              ))}
              {card.version.split("").map((char, index) => (
                <div
                  className="vertical-letter version-char"
                  key={`ver-${index}`}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrevEditions;
