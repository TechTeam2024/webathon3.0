import React from 'react';


export function SubmissionCard({ submission, onClick, className }) {
    return (
        <div
            onClick={onClick}
            className={`bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 w-[300px] sm:w-sm 
        transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/70 border border-gray-700 ${className}`}
        >
            {/* <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                <img
                    src={submission.thumbnail}
                    alt={submission.projectName}
                    className="object-cover w-full h-full"
                />
            </div> */}

            <h3 className="text-xl font-semibold text-white">{submission.team}</h3>

            <p className="text-white">
                {submission.description}
            </p>
        </div>
    );
}