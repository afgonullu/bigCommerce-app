import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GlobalStyles, Box, AlertsManager } from "@bigcommerce/big-design";
import { createTheme } from "@bigcommerce/big-design-theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Onboard from "./pages/Onboard/Onboard";
import { QueryClient, QueryClientProvider } from "react-query";
import Overview from "./pages/Overview/Overview";
import { useAlertsManager } from "./hooks/useAlertsManager";
import FakeAuthPage from "./pages/FakeAuthPage";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

const theme = createTheme();
const AppGlobalStyles = createGlobalStyle`
  body {
    height: 100%;
    max-width: 1080px;
    margin: 2rem auto;
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

const App: React.FC = () => {
    const alertsManager = useAlertsManager();

    return (
        <>
            <Box marginHorizontal="xxxLarge" marginVertical="xxLarge">
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <AppGlobalStyles />
                        <GlobalStyles />
                        <AlertsManager manager={alertsManager} />
                        <BrowserRouter>
                            <Switch>
                                <Route
                                    path="/fake_auth_page"
                                    component={FakeAuthPage}
                                />
                                <Route path="/overview" component={Overview} />
                                <Route path="/onboard" component={Onboard} />
                                <Route path="/" component={Onboard} />
                            </Switch>
                        </BrowserRouter>
                    </ThemeProvider>
                </QueryClientProvider>
            </Box>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
