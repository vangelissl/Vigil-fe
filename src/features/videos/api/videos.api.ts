import { apiClient } from "../../../shared/api/client";
import axios from "axios";
import { type Video, type VideoUploadResponse } from "../types";

export const videosAPI = {
	list: async () => {
		const response = await apiClient.get<Video[]>("/videos");
		return response.data;
	},

	getById: async (videoId: string) => {
		const response = await apiClient.get<Video>(`/videos/${videoId}`);
		return response.data;
	},

	getDownloadUrl: async (videoId: string) => {
		const response = await apiClient.get<{ url: string }>(
			`/videos/${videoId}/download`,
		);
		return response.data.url;
	},

	upload: async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		const token = localStorage.getItem("access_token");
		const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:5000/").replace(/\/$/, "") + "/";

		const response = await axios.post<VideoUploadResponse>(
			`${baseURL}videos/upload/`,
			formData,
			{
				headers: {
					Authorization: token ? `Bearer ${token}` : undefined,
				},
				withCredentials: true,
			}
		);
		return response.data;
	},

	delete: async (videoId: string) => {
		await apiClient.delete(`/videos/${videoId}`);
	},
};
