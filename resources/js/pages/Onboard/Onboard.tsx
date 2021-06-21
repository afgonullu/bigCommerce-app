import React, { useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { onboardStateApi } from "../../services";
import Connect from "./Connect";
import Requirements from "./Requirements";
import Storefront from "./Storefront";

const Onboard: React.FC = () => {
    const router = useHistory();
    const match = useRouteMatch();

    console.log(match);

    useEffect(() => {
        const fetch = async () => {
            const onboardingState = await onboardStateApi.getOnboardedState();
            console.log("state", onboardingState);
            if (onboardingState[0]) {
                switch (onboardingState[0].status) {
                    case "step_storefront_select": {
                        // if (match.path === "/onboard/storefront") {
                        //     if (!hasMultipleStorefronts && !isLoading) {
                        //         nextStepRedirect({
                        //             status: "step_requirements",
                        //             storefrontChannelId: storefrontChannels[0].id,
                        //         });
                        //     }
                        // } else {
                        //     router.push("/onboard/storefront");
                        // }
                        router.push(`/onboard/storefront`);
                        break;
                    }
                    case "step_requirements":
                        if (match.path !== "/onboard/requirements") {
                            router.push(`/onboard/requirements`);
                        }
                        break;
                    case "step_connection":
                        if (match.path !== "/onboard/connect") {
                            router.push(`/onboard/connect`);
                        }
                        break;
                    case "step_connection_ready":
                        if (match.path !== "/onboard/connect") {
                            router.push(`/onboard/connect`);
                        }
                        break;
                    case "onboarded":
                        if (match.path !== "/overview") {
                            router.push("/overview");
                        }
                        break;
                    default:
                        router.push("/onboard");
                }
            } else {
                router.push(`/onboard/storefront`);
            }
        };
        fetch();
    }, [router]);

    return (
        <>
            <Switch>
                <Route
                    path={`${match.url}/storefront`}
                    component={Storefront}
                />
                <Route
                    path={`${match.url}/requirements`}
                    component={Requirements}
                />
                <Route path={`${match.url}/connect`} component={Connect} />
            </Switch>
        </>
    );
};

export default Onboard;
