import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { OnboardedState } from "../interfaces/state";
import onboardStateApi from "../services/onboardState";
import useNextStepRedirect from "./useNextStepRedirect";

const useOnboardRedirect = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [onboardedState, setOnboardedState] = useState<OnboardedState | null>(
        null
    );
    const router = useHistory();
    const match = useRouteMatch();
    const nextStepRedirect = useNextStepRedirect();

    useEffect(() => {
        setIsLoading(true);

        const fetch = async () => {
            const onboardingState = await onboardStateApi.getOnboardedState();
            setOnboardedState(onboardingState);
        };
        fetch();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        // TODO: Add logic for 'splash' screen for when there is only a single storefront,
        //       which starts the auth process on the first step (see designs for that flow)

        switch (onboardedState?.status) {
            case "step_storefront_select": {
                if (match.path !== "/onboard/storefront") {
                    router.push("/onboard/storefront");
                }
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
    }, [isLoading, onboardedState, router, nextStepRedirect]);
};

export default useOnboardRedirect;
