import React, { useCallback, useState } from "react";
import { X, Github, ExternalLink, Users, Save, Send } from "lucide-react";
// eslint-disable-next-line no-undef
const URL = process.env.REACT_APP_SCRIPT_URL;

const SCORING_CRITERIA = [
  {
    id: "score1",
    name: "Innovation & Creativity",
    description:
      "Uniqueness of the solution and creative approach to solving the problem",
    maxScore: 10,
  },
  {
    id: "score2",
    name: "Technical Complexity",
    description:
      "Sophistication of the technical implementation and use of advanced features",
    maxScore: 10,
  },
  {
    id: "score3",
    name: "Social Impact",
    description:
      "Potential impact on society and addressing real-world problems",
    maxScore: 10,
  },
  {
    id: "score4",
    name: "User Experience & Design",
    description:
      "Quality of user interface, user experience, and overall design",
    maxScore: 10,
  },
  {
    id: "score5",
    name: "Completion & Polish",
    description: "Level of completion, polish, and attention to detail",
    maxScore: 10,
  },
];

export function SubmissionModal({ submission, onClose, jury }) {
  const [scores, setScores] = useState(
    SCORING_CRITERIA.map((criteria) => ({ criteriaId: criteria.id, score: 0 }))
  );

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleScoreChange = (criteriaId, value) => {
    setScores((prev) =>
      prev.map((score) =>
        score.criteriaId === criteriaId
          ? { ...score, score: Math.min(10, Math.max(0, value)) }
          : score
      )
    );
  };

  const handleSubmit = async () => {
    // Here you would typically send the scores to your backend
    console.log("Submission scores:", scores);
    console.log("submission: ", submission);
    const score1 = scores[0].score;
    const score2 = scores[1].score;
    const score3 = scores[2].score;
    const score4 = scores[3].score;
    const score5 = scores[4].score;
    console.log(score1, score2, score3, scores);
    const response = await fetch(URL, {
      redirect: "follow",
      headers: {
        "Content-type": "text/plain;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({
        team: submission.team,
        jury_no: submission.jury,
        score1,
        score2,
        score3,
        score4,
        score5,
      }),
    });
    const data = await response.json();
    if (data.status == 200) {
      window.location.reload();
    } else {
      alert("Error occured. ", data.message);
    }
    onClose();
  };

  const getScoreForCriteria = (criteriaId) => {
    return scores.find((score) => score.criteriaId === criteriaId)?.score ?? 5;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800/50 backdrop-blur-sm w-full h-full md:h-[90vh] md:w-[90vw] md:rounded-2xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X size={24} color="black" />
        </button>

        <div className="h-full overflow-y-auto">
          <div className="p-6 max-w-4xl mx-auto">
            <div className="prose max-w-none">
              <div className="pt-6 mt-6">
                <h3 className="text-xl font-semibold mb-6 text-white">
                  Jury Evaluation
                </h3>
                <div className="space-y-6">
                  {SCORING_CRITERIA.map((criteria) => (
                    <div
                      key={criteria.id}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <label
                          htmlFor={criteria.id}
                          className="font-medium text-gray-900"
                        >
                          {criteria.name}
                        </label>
                        <span className="text-sm font-medium text-gray-500">
                          Score: {getScoreForCriteria(criteria.id)}/10
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {criteria.description}
                      </p>
                      {jury ? (
                        <input
                          type="number"
                          id={criteria.id}
                          min="0"
                          max="10"
                          step="1"
                          value={getScoreForCriteria(criteria.id)}
                          onChange={(e) =>
                            handleScoreChange(
                              criteria.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                          className="w-[50px] h-[30px] p-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 text-black"
                        />
                      ) : (
                        <input
                          type="number"
                          readOnly
                          id={criteria.id}
                          min="0"
                          max="10"
                          step="1"
                          value={getScoreForCriteria(criteria.id)}
                          onChange={(e) =>
                            handleScoreChange(
                              criteria.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                          className="w-[50px] h-[30px] p-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 text-black"
                        />
                      )}
                    </div>
                  ))}
                </div>
                {jury && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center px-3 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit Evaluation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
