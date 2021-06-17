import { Text } from "@bigcommerce/big-design";
import React, { useEffect, useState } from "react";

import Requirement from "../../components/Requirement";
import { Requirement as RequirementType } from "../../interfaces/requirement";
import { OnboardingHeader } from "../../components/OnboardingHeader";
import { LoadingPanel } from "../../components/LoadingPanel";
import { OnboardingActionBar } from "../../components/OnboardingActionBar";
import requirementsApi from "../../services/requirements";
import config from "../../utils/config";

const Requirements = () => {
    const [requirements, setRequirements] = useState<RequirementType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const canContinue = (requirements || []).every(
        (requirement) => requirement.status === "success"
    );

    // useOnboardRedirect();

    useEffect(() => {
        setIsLoading(true);
        const fetch = async () => {
            const requirements = await requirementsApi.getRequirements();
            setRequirements(requirements);
            setIsLoading(false);
        };
        fetch();
    }, []);

    return (
        <>
            <OnboardingHeader currentStep={1} />
            <LoadingPanel header="Channel Requirements" isLoading={isLoading}>
                <Text>
                    {`Complete each requirement to connect to ${config.NEXT_PUBLIC_CHANNEL_NAME}`}
                </Text>
                {(requirements || []).map((requirement, index) => (
                    <Requirement key={index} {...requirement} />
                ))}
            </LoadingPanel>
            <OnboardingActionBar canContinue={canContinue} currentStep={1} />
        </>
    );
};

export default Requirements;
