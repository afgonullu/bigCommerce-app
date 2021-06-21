import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { onboardStateApi } from "../services";

export function useStatusPoller() {
    const [enabled, setIsEnabled] = useState(false);
    const [retries, setRetries] = useState(0);
    const query = useQuery(
        "statusPoller",
        async () => {
            const onboardingState = await onboardStateApi.getOnboardedState();
            return onboardingState.status;
        },
        {
            enabled,
            refetchInterval: 2000,
            onSuccess: () => {
                setRetries((retries) => retries + 1);
            },
        }
    );

    useEffect(() => {
        if (retries >= 5) {
            setIsEnabled(false);
            setRetries(0);
        }
    }, [retries]);

    return {
        startPoller: () => setIsEnabled(true),
        stopPoller: () => {
            setIsEnabled(false);
            setRetries(0);
        },
        isPolling: enabled,
        retries,
        ...query,
    };
}
