import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import { App } from "./App";

import { LoginPage } from "./routes/LoginPage";
import { RegisterPage } from "./routes/RegisterPage";
import { DashboardPage } from "./routes/DashboardPage";
import { VideoListPage } from "./routes/VideoListPage";
import { VideoUploadPage } from "./routes/VideoUploadPage";
import { VideoDetailPage } from "./routes/VideoDetailPage";
import { ProfilePage } from "./routes/ProfilePage";
import { AnalysisResultsPage } from "./routes/AnalysisResultsPage";
import { NotFoundPage } from "./routes/NotFoundPage";

import { AppLayout } from "./features/layout/components/AppLayout";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";

const rootRoute = createRootRoute({
	component: App,
	notFoundComponent: NotFoundPage,
});

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

const appRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => (
		<ProtectedRoute>
			<AppLayout />
		</ProtectedRoute>
	),
});

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

const profileRoute = createRoute({
	getParentRoute: () => appRoute,
	path: "/profile",
	component: ProfilePage,
});

const analysisRoute = createRoute({
	getParentRoute: () => appRoute,
	path: "/analysis/$analysisId",
	component: AnalysisResultsPage,
});

const routeTree = rootRoute.addChildren([
	loginRoute,
	registerRoute,
	appRoute.addChildren([
		dashboardRoute,
		videoListRoute,
		videoUploadRoute,
		videoDetailRoute,
		profileRoute,
		analysisRoute,
	]),
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
