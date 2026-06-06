import axios from "axios";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/",
	withCredentials: true,
	timeout: 10000,
});

// REQUEST INTERCEPTOR
// Add auth token to every request
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
// Handle 401 (expired token) by refreshing and retrying
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const response = await axios.post(
					`${apiClient.defaults.baseURL}/auth/refresh`,
					{},
					{ withCredentials: true }
				);

				const { access_token } = response.data;
				localStorage.setItem("access_token", access_token);

				originalRequest.headers.Authorization = `Bearer ${access_token}`;
			} catch (refreshError) {
				// Use auth store when implemented
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default apiClient;
