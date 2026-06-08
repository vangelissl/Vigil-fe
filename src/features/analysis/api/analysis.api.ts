import { apiClient } from "../../../shared/api/client";
import { type Analysis } from "../types";

export const analysisAPI = {
	triggerAnalysis: async (videoId: string) => {
		const response = await apiClient.post<Analysis>(
			`/videos/${videoId}/analyses`,
		);
		return response.data;
	},

	getAnalysis: async (analysisId: string) => {
		const response = await apiClient.get<Analysis>(`/analyses/${analysisId}`);
		return response.data;
	},

	listAnalyses: async () => {
		const response = await apiClient.get<Analysis[]>(`/analyses`);
		return response.data;
	},

	deleteAnalysis: async (analysisId: string) => {
		await apiClient.delete(`/analyses/${analysisId}`);
	},
};
