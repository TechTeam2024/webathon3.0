import axios from "axios";
import { Search, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmissionCard } from "./SubmissionCard";
import GalleryPreloader from "../components/ui/GalleryPreloader2";
import { SubmissionModal } from "./SubmissionModal";

function Dashboard() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEvaluated, setShowEvaluated] = useState(false);
  const [jury, setJury] = useState(localStorage.getItem("jury_no"));
  const URL = process.env.REACT_APP_SCRIPT_URL;

  useEffect(() => {
    (async () => {
      setSubmissions(null);
      setJury(localStorage.getItem("jury_no"));
      const response = await axios.get(URL);
      const data = response.data.filter((submission) =>
        jury == 0
          ? showEvaluated
            ? submission.evaluated == 1
            : submission.evaluated == 0
          : showEvaluated
            ? submission.evaluated == 1 && submission.jury == jury
            : submission.jury == jury && submission.evaluated == 0
      );
      setSubmissions(data);
      console.log(jury);
      console.log("data: ", data);
    })();
  }, [showEvaluated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-gradient p-4 pt-[110px]">
      <header className="shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-white">
                Webathon 3.0 Jury Dashboard
              </h1>
            </div>
            <button
              className="btn bg-indigo-600 w-[120px] h-[40px] rounded-lg"
              onClick={() => {
                localStorage.clear();
                window.location.replace("/jury");
              }}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <div className="flex justify-around flex-wrap gap-4 border-b-1 border-gray-700 mt-[30px]">
        <div className="relative">
          <Search className="absolute left-3 top-[20px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search teams or projects..."
            className="mb-[10px] pl-10 w-full sm:w-sm px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500 w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={showEvaluated}
              onChange={() => setShowEvaluated((prev) => !prev)}
              className="form-checkbox size-3.5 text-purple-500 rounded border-gray-700 bg-gray-900"
            />
            <span className="ml-2 text-gray-300">Show Evaluated Only</span>
          </label>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions ? (
            submissions.map((submission, id) => {
              const isVisible =
                submission.team
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) || searchTerm === "";
              return (
                <SubmissionCard
                  className={isVisible ? "block" : "hidden"}
                  key={id}
                  submission={submission}
                  onClick={() => setSelectedSubmission(submission)}
                />
              );
            })
          ) : (
            <GalleryPreloader />
          )}
        </div>
      </main>

      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          jury={jury}
        />
      )}
    </div>
  );
}

export default Dashboard;
