import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { GlobalStyles, Box } from "@bigcommerce/big-design";

import Home from "./pages/Home";
import List from "./pages/List";

const App = () => {
    return (
        <>
            <GlobalStyles />
            <Box marginHorizontal="xxxLarge" marginVertical="xxLarge">
                <BrowserRouter>
                    <div>
                        <nav className="container">
                            <ul className="nav mt-2 mb-2">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/list">
                                        List
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <Switch>
                            <Route exact path="/list" component={List} />
                            <Route component={Home} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Box>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
