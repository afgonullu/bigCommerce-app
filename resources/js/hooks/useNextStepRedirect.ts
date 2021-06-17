import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { OnboardedState, OnboardedStatus } from "../interfaces/interfaces";
import { onboardStateApi } from "../services";

const routes: Record<OnboardedStatus, string> = {
    step_requirements: "/onboard/requirements",
    step_connection: "/onboard/connect",
    step_connection_ready: "/onboard/connect",
    step_storefront_select: "/onboard/storefront",
    onboarded: "/overview",
};

const useNextStepRedirect = () => {
    const router = useHistory();

    return useCallback(
        async (body: OnboardedState) => {
            const response = await onboardStateApi.setOnboardedState(body);
            router.push(routes[response.status]);
        },
        [router]
    );
};

export default useNextStepRedirect;
