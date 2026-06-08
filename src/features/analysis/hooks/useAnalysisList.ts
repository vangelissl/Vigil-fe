import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { analysisAPI } from "../api/analysis.api";
import { useUIStore } from "../../../shared/stores/ui.store";

export function useAnalysisList() {
	const queryClient = useQueryClient();
	const addToast = useUIStore((state) => state.addToast);

	const query = useQuery({
		queryKey: ["analyses"],
		queryFn: () => analysisAPI.listAnalyses(),
		staleTime: 1000 * 60 * 5,
	});

	const deleteMutation = useMutation({
		mutationFn: (analysisId: string) => analysisAPI.deleteAnalysis(analysisId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["analyses"] });
			addToast("Analysis deleted", "success");
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			addToast(error.response?.data?.detail || "Delete failed", "error");
		},
	});

	return {
		analyses: query.data,
		isLoading: query.isLoading,
		error: query.error,
		deleteAnalysis: deleteMutation.mutate,
		isDeleting: deleteMutation.isPending,
	};
}
