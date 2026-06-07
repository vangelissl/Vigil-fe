import { RootRoute, Route, Router } from "@tanstack/react-router";
import { App } from "./App";

// Import all page components
import { LoginPage } from "./routes/LoginPage";
import { RegisterPage } from "./routes/RegisterPage";
import { DashboardPage } from "./routes/DashboardPage";
import { VideoListPage } from "./routes/VideoListPage";
import { VideoUploadPage } from "./routes/VideoUploadPage";
import { VideoDetailPage } from "./routes/VideoDetailPage";
import { ProfilePage } from "./routes/ProfilePage";
import { AnalysisResultsPage } from "./routes/AnalysisResultsPage";
import { NotFoundPage } from "./routes/NotFoundPage";

// Import layout components
import { AppLayout } from "./features/layout/components/AppLayout";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";

// Root route
const rootRoute = new RootRoute({
	component: App,
});

// Public routes (no auth needed)
const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/login",
	component: LoginPage,
});

const registerRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/register",
	component: RegisterPage,
});

// Protected layout
const appRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => (
		<ProtectedRoute>
			<AppLayout />
		</ProtectedRoute>
	),
});

// Protected routes (children of appRoute)
const dashboardRoute = new Route({
	getParentRoute: () => appRoute,
	path: "/dashboard",
	component: DashboardPage,
});

const videoListRoute = new Route({
	getParentRoute: () => appRoute,
	path: "/videos",
	component: VideoListPage,
});

const videoUploadRoute = new Route({
	getParentRoute: () => appRoute,
	path: "/videos/upload",
	component: VideoUploadPage,
});

const videoDetailRoute = new Route({
	getParentRoute: () => appRoute,
	path: "/videos/detail",
	component: VideoDetailPage,
});

const analysisResultsRoute = new Route({
	getParentRoute: () => appRoute,
	path: "/analysis/results",
	component: AnalysisResultsPage,
});

const profileRoute = new Route({
	getParentRoute: () => appRoute,
	path: "/profile",
	component: ProfilePage,
});

// 404 route
const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "*",
	component: NotFoundPage,
});

// Combine all routes
const routeTree = rootRoute.addChildren([
	loginRoute,
	registerRoute,
	appRoute.addChildren([
		dashboardRoute,
		videoListRoute,
		videoUploadRoute,
		videoDetailRoute,
		analysisResultsRoute,
		profileRoute,
	]),
	notFoundRoute,
]);

// Create router
export const router = new Router({ routeTree });

// Type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
