import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import useOnboardRedirect from "../../hooks/useOnboardRedirect";
import Connect from "./Connect";
import Requirements from "./Requirements";
import Storefront from "./Storefront";

const Onboard: React.FC = () => {
    useOnboardRedirect();
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/storefront`} component={Storefront} />
            <Route
                path={`${match.url}/requirements`}
                component={Requirements}
            />
            <Route path={`${match.url}/connect`} component={Connect} />
        </Switch>
    );
};

export default Onboard;
