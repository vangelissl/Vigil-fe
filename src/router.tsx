import { createRootRoute, createRoute, Router } from '@tanstack/react-router';
import { App } from './App';

// Pages
import { LoginPage } from './routes/LoginPage';
import { RegisterPage } from './routes/RegisterPage';
import { DashboardPage } from './routes/DashboardPage';
import { VideoListPage } from './routes/VideoListPage';
import { VideoUploadPage } from './routes/VideoUploadPage';
import { VideoDetailPage } from './routes/VideoDetailPage';
import { ProfilePage } from './routes/ProfilePage';
import { AnalysisResultsPage } from './routes/AnalysisResultsPage';
import { NotFoundPage } from './routes/NotFoundPage';

// Components
import { AppLayout } from './features/layout/components/AppLayout';
import { ProtectedRoute } from './shared/components/ProtectedRoute';

// Root
const rootRoute = createRootRoute({
  component: App,
  notFoundComponent: NotFoundPage,
});

// Public routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

// Protected routes with layout
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ProtectedRoute>
      <AppLayout>
        <DashboardPage />
      </AppLayout>
    </ProtectedRoute>
  ),
});

const videoListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos',
  component: () => (
    <ProtectedRoute>
      <AppLayout>
        <VideoListPage />
      </AppLayout>
    </ProtectedRoute>
  ),
});

const videoUploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos/upload',
  component: () => (
    <ProtectedRoute>
      <AppLayout>
        <VideoUploadPage />
      </AppLayout>
    </ProtectedRoute>
  ),
});

const videoDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos/$videoId',
  component: () => (
    <ProtectedRoute>
      <AppLayout>
        <VideoDetailPage />
      </AppLayout>
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute>
      <AppLayout>
        <ProfilePage />
      </AppLayout>
    </ProtectedRoute>
  ),
});

const analysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analysis/$analysisId',
  component: () => (
    <ProtectedRoute>
      <AppLayout>
        <AnalysisResultsPage />
      </AppLayout>
    </ProtectedRoute>
  ),
});

// Route tree
const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  dashboardRoute,
  videoListRoute,
  videoUploadRoute,
  videoDetailRoute,
  profileRoute,
  analysisRoute,
]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}