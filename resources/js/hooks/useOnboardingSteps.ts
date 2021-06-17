import { useMemo } from "react";
import { OnboardedStatus } from "../interfaces/interfaces";

export function useOnboardingSteps() {
    const steps = useMemo(
        (): Array<{ route: string; name: string; status: OnboardedStatus }> => [
            {
                route: "/onboard/storefront",
                name: "Storefront Selection",
                status: "step_storefront_select",
            },
            {
                route: "/onboard/requirements",
                name: "Requirements",
                status: "step_requirements",
            },
            {
                route: "/onboard/connect",
                name: "Connection",
                status: "step_connection",
            },
            {
                route: "/onboard/connect",
                name: "Connection",
                status: "step_connection_ready",
            },
        ],
        []
    );

    return steps;
}
