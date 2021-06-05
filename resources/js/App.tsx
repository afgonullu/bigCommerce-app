import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GlobalStyles, Box } from "@bigcommerce/big-design";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyles />
            <Box marginHorizontal="xxxLarge" marginVertical="xxLarge">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/products" component={Products} />
                        <Route
                            exact
                            path="/products/:id"
                            component={ProductDetails}
                        />
                        <Route component={Home} />
                    </Switch>
                </BrowserRouter>
            </Box>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
