import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdAccount from "../../components/Overview/AdAccount";
import Analytics from "../../components/Overview/Analytics";
import BusinessCenter from "../../components/Overview/BusinessCenter";
import CatalogSync from "../../components/Overview/CatalogSync";
import PageTitle from "../../components/PageTitle";
import { OnboardedState } from "../../interfaces/interfaces";
import { onboardStateApi } from "../../services";

const Overview: React.FC = () => {
    const router = useHistory();
    const [onboardedState, setOnboardedState] = useState<OnboardedState | null>(
        null
    );

    useEffect(() => {
        const fetch = async () => {
            const onboardingState = await onboardStateApi.getOnboardedState();
            if (onboardingState.status !== "onboarded") {
                router.push("/onboard");
            }

            setOnboardedState(onboardingState);
        };
        fetch();
    }, []);

    if (!onboardedState || onboardedState?.status !== "onboarded") {
        return <></>;
    }

    return (
        <>
            <PageTitle title="Overview" />

            <BusinessCenter accountName={onboardedState?.platformBusinessId} />
            <AdAccount accountName={onboardedState?.platformAccountId} />
            <Analytics accountName={onboardedState?.platformAnalyticsId} />
            <CatalogSync />
        </>
    );
};

export default Overview;
