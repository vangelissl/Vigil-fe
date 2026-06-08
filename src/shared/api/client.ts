import axios from "axios";

export const apiClient = axios.create({
	baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000/").replace(/\/$/, "") + "/",
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
		// For FormData, let axios automatically set Content-Type with boundary
		if (config.data instanceof FormData) {
			config.headers["Content-Type"] = undefined;
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
				const baseURL = apiClient.defaults.baseURL || "/";
				const refreshUrl = baseURL.endsWith("/") 
					? `${baseURL}auth/refresh` 
					: `${baseURL}/auth/refresh`;

				const response = await axios.post(
					refreshUrl,
					{},
					{ withCredentials: true },
				);

				const { access_token } = response.data;
				localStorage.setItem("access_token", access_token);

				originalRequest.headers.Authorization = `Bearer ${access_token}`;
				// Remove Content-Type for FormData retry
				if (originalRequest.data instanceof FormData) {
					delete originalRequest.headers["Content-Type"];
				}
				return apiClient.request(originalRequest);
			} catch (refreshError) {
				// Token refresh failed - clear auth state and redirect to login
				localStorage.removeItem("access_token");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default apiClient;
