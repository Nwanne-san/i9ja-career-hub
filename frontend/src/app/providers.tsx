"use client";

import { ThemeProvider } from "@/modules/shared/component/ThemeProvider";
import { AuthSessionSync } from "@/modules/shared/component/AuthSessionSync";
import { muiTheme } from "@/theme/muiTheme";
import { store, persistor } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppRouterCacheProvider>
            <MuiThemeProvider theme={muiTheme}>
              <SnackbarProvider maxSnack={3}>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="dark"
                  enableSystem={false}
                >
                  <AuthSessionSync />
                  {children}
                </ThemeProvider>
              </SnackbarProvider>
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
