import axios from "axios";
import { Search, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmissionCard } from "./SubmissionCard";
import { Loading } from "./Loading";
import { SubmissionModal } from "./SubmissionModal";
function Dashboard() {
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [submissions, setSubmissions] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const URL = process.env.REACT_APP_SCRIPT_URL
    useEffect(() => {
        (async () => {
            const jury = Number(localStorage.getItem("jury")) || 1
            const response = await axios.get(URL)
            const data = response.data.filter(submission => submission.jury == jury && submission.evaluated == 0)

            setSubmissions(data)
            console.log(data)
        })()
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-gradient p-4">
            <header className="shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-indigo-600" />
                        <h1 className="text-2xl font-bold text-white">Webathon 3.0 Jury Dashboard</h1>
                    </div>
                </div>
            </header>
            {/* <div className="bg-gray-900 rounded-md border-white border-1 shadow-lg py-3 mb-8"> */}
            <div className="flex justify-around flex-wrap gap-4 border-b-1 border-gray-700">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search teams or projects..."
                        className="mb-[10px] pl-10 w-full sm:w-sm px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* <div className="flex items-center justify-end">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value={"showEvaluated"}
                                onChange={null}
                                className="form-checkbox size-3.5 text-purple-500 rounded border-gray-700 bg-gray-900"
                            />
                            <span className="ml-2 text-gray-300">Show Evaluated Only</span>
                        </label>
                    </div> */}
            </div>
            {/* </div> */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions ? submissions.map((submission, id) => {
                        const isVisible = submission.team.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "";
                        return (
                            <SubmissionCard
                                className={isVisible ? "block" : "hidden"}
                                key={id}
                                submission={submission}
                                onClick={() => setSelectedSubmission(submission)}
                            />
                        )
                    }) : <Loading fullScreen />}
                </div>
            </main>

            {selectedSubmission && (
                <SubmissionModal
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                />
            )}
        </div>
    );
}

export default Dashboard