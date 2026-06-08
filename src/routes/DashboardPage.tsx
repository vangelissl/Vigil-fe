import { useVideoList } from "../features/videos/hooks/useVideoList";
import { useAnalysisList } from "../features/analysis/hooks/useAnalysisList";
import { Link } from "@tanstack/react-router";

export function DashboardPage() {
	const { videos, isLoading: videosLoading } = useVideoList();
	const { analyses, isLoading: analysesLoading } = useAnalysisList();

	return (
		<div>
			<h1 className="text-3xl font-bold mb-8">Dashboard</h1>

			<div className="grid md:grid-cols-2 gap-6">
				{/* Videos Card */}
				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">Videos</h2>
						<Link
							to="/videos/upload"
							className="text-blue-600 hover:underline text-sm"
						>
							Upload new
						</Link>
					</div>

					{videosLoading ? (
						<p className="text-gray-600">Loading...</p>
					) : videos && videos.length > 0 ? (
						<div>
							<p className="text-2xl font-bold text-blue-600 mb-2">
								{videos.length}
							</p>
							<p className="text-gray-600">Total videos uploaded</p>
							<Link
								to="/videos"
								className="text-blue-600 hover:underline text-sm mt-4 block"
							>
								View all videos →
							</Link>
						</div>
					) : (
						<p className="text-gray-600">
							No videos yet.{" "}
							<Link
								to="/videos/upload"
								className="text-blue-600 hover:underline"
							>
								Upload one
							</Link>
						</p>
					)}
				</div>

				{/* Analyses Card */}
				<div className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-xl font-semibold mb-4">Analyses</h2>

					{analysesLoading ? (
						<p className="text-gray-600">Loading...</p>
					) : analyses && analyses.length > 0 ? (
						<div>
							<p className="text-2xl font-bold text-green-600 mb-2">
								{analyses.length}
							</p>
							<p className="text-gray-600">Total analyses completed</p>
							<div className="mt-4 space-y-2">
								{analyses.slice(0, 3).map((analysis) => (
									<Link
										key={analysis.id}
										to="/analysis/$analysisId"
										params={{ analysisId: analysis.id }}
										className="text-blue-600 hover:underline text-sm block truncate"
									>
										Analysis {analysis.id.slice(0, 8)}... - {analysis.status}
									</Link>
								))}
							</div>
						</div>
					) : (
						<p className="text-gray-600">No analyses yet.</p>
					)}
				</div>
			</div>
		</div>
	);
}
