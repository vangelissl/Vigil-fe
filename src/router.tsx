import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
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
const rootRoute = createRootRoute({
	component: App,
	notFoundComponent: NotFoundPage,
});

// Public routes (no auth needed)
const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/login",
	component: LoginPage,
});

const registerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/register",
	component: RegisterPage,
});

// Protected layout
const appRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => (
		<ProtectedRoute>
			<AppLayout />
		</ProtectedRoute>
	),
});

// Protected routes (children of appRoute)
const dashboardRoute = createRoute({
	getParentRoute: () => appRoute,
	path: "/dashboard",
	component: DashboardPage,
});

const videoListRoute = createRoute({
	getParentRoute: () => appRoute,
	path: "/videos",
	component: VideoListPage,
});

const videoUploadRoute = createRoute({
	getParentRoute: () => appRoute,
	path: "/videos/upload",
	component: VideoUploadPage,
});

const videoDetailRoute = createRoute({
	getParentRoute: () => appRoute,
	path: "/videos/$videoId",
	component: VideoDetailPage,
});

const analysisResultsRoute = createRoute({
	getParentRoute: () => appRoute,
	path: "/analysis/results",
	component: AnalysisResultsPage,
});

const profileRoute = createRoute({
	getParentRoute: () => appRoute,
	path: "/profile",
	component: ProfilePage,
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
]);

// Create router
export const router = new Router({ routeTree });

// Type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
