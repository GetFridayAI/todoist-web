import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import Dashboard from './src/webos/components/dashboard/Dashboard';
import { DashboardRoutes as AppRoutes } from './src/shared/interfaces/routes.interface';
import { View } from 'react-native';
import { APP_THEMES } from './src/shared/interfaces/app.interface';
import { ThemeProvider, useTheme } from './src/shared/context/ThemeContext';
import { AppStoreProvider } from './src/shared/context/AppStoreContext';
import appStyles from './src/shared/styles/app.styles';

const ROUTE_SEGMENT_MAP: Record<string, AppRoutes> = {
  search: AppRoutes.SEARCH,
  inbox: AppRoutes.INBOX,
  today: AppRoutes.TODAY,
  upcoming: AppRoutes.UPCOMING,
  completed: AppRoutes.COMPLETED,
  projects: AppRoutes.PROJECTS,
  settings: AppRoutes.SETTINGS,
};

function DashboardRoute() {
  const { activeRoute: activeRouteSegment } = useParams<{ activeRoute?: string }>();
  const [searchParams] = useSearchParams();

  const activeRoute = activeRouteSegment
    ? ROUTE_SEGMENT_MAP[activeRouteSegment.toLowerCase()]
    : undefined;

  const routeParams = Object.fromEntries(searchParams.entries());

  return (
    <Dashboard
      activeRoute={activeRoute}
      routeParams={Object.keys(routeParams).length > 0 ? routeParams : undefined}
    />
  );
}

const APP_THEME = APP_THEMES.DARK;

function ThemedApp() {
  const { styles } = useTheme();

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.userSelect = 'none';
      (document.body.style as any).webkitUserSelect = 'none';
    }
  }, []);

  return (
    <View style={[appStyles[APP_THEME], { flex: 1 }]}>
      <BrowserRouter>
        <StatusBar style="auto" />
        <Routes>
          <Route path="/dashboard" element={<DashboardRoute />} />
          <Route path="/dashboard/:activeRoute" element={<DashboardRoute />} />
          <Route path="*" element={<p>Page not found </p>} />
        </Routes>
      </BrowserRouter>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={APP_THEME}>
      <AppStoreProvider>
        <ThemedApp />
      </AppStoreProvider>
    </ThemeProvider>
  );
}
