import { useParams } from "@tanstack/react-router";
import { useAnalysis } from "../features/analysis/hooks/useAnalysis";
import { AnalysisStatusBadge } from "../features/analysis/components/AnalysisStatusBadge";
import { ClassificationResultComponent } from "../features/analysis/components/ClassificationResult";

export function AnalysisResultsPage() {
    const { analysisId } = useParams({ from: "/analysis/$analysisId" });
    const { data: analysis, isLoading } = useAnalysis(analysisId);

    if (isLoading) {
        return <div className="text-center py-8">Loading analysis...</div>;
    }

    if (!analysis) {
        return <div className="text-center py-8">Analysis not found</div>;
    }

    const status = analysis.status?.toLowerCase() || "";

    return (
        <div>
            <div className="flex justify-between items-start mb-8">
                <h1 className="text-3xl font-bold">Analysis Results</h1>
                <AnalysisStatusBadge status={analysis.status} />
            </div>

            {status === "processing" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                    <p className="text-yellow-800">
                        Analysis is still processing. Please wait...
                    </p>
                </div>
            )}

            {status === "failed" && (
                <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
                    <p className="text-red-800">Analysis failed. Please try again.</p>
                </div>
            )}

            {status === "completed" && analysis.result && Object.keys(analysis.result).length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                    <ClassificationResultComponent result={analysis.result} />
                </div>
            )}
        </div>
    );
}