import React from "react";
import "./PrevEditions.css"; // Import custom CSS

function PrevEditions() {
  // Array of cards data for reusability
  const cardData = [
    {
      id: 1,
      image: "/poster1.svg",
      title: "WEBATHON 1.0",
      description: [
        "WEBATHON 1.0",
        "Round 1: 24th March 2023",
        "Round 2: 27th & 28th March 2023",
        "Teams: 4-5 members competing in innovative challenges",
        "Prize Pool: ₹10,000 awarded to top performers",
        "The Legacy Continues, Stay tuned for WEBATHON 3.0!",
      ],
      version: "1•0",
    },
    {
      id: 2,
      image: "/poster2.svg",
      title: "Webathon 2.0",
      description: [
        "Webathon 2.0",
        "Theme: \"Connect. Collaborate. Create.\"",
        "Round 1: 2nd March 2024",
        "Round 2: 22nd & 23rd March 2024",
        "Teams: 4-5 members tackling innovative web development challenges",
        "Prize Pool: ₹15,000, enhanced to encourage competition and innovation",
        "The Legacy Continues, Stay tuned for WEBATHON 3.0!",
      ],
      version: "2•0",
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
              <ul className="pr-5 pl-2">
                {card.description.map((line, index) => (
                  <li
                    key={index}
                    style={
                      index === 0
                        ? {
                            color:
                              card.version === "1•0" ? "#3498db" : "#9ACD32", // Light Blue for 1.0, Light Olive Green for 2.0
                            fontWeight: "bold",
                            fontSize: "1.6rem", // Increased size for better visibility
                            padding: "10px 0", // Added padding for better spacing
                          }
                        : { listStyle: "initial" }
                    }
                  >
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
                  style={{
                    color: card.version === "2•0" ? "#9ACD32" : "#3498db", 
                  }}
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
