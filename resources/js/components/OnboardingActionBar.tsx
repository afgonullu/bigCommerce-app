import { Box, Button, Flex } from "@bigcommerce/big-design";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";

import { OnboardedState } from "../interfaces/state";
import { useOnboardingSteps } from "../hooks/useOnboardingSteps";
import useNextStepRedirect from "../hooks/useNextStepRedirect";
import useUpsertChannel from "../hooks/useUpsertChannel";
import { useAlert } from "../hooks/useAlert";

interface Props {
    currentStep: number;
    canContinue: boolean;
    dataToSave?: Partial<OnboardedState>;
}

const StyledFlex = styled(Box)`
    bottom: 0;
    left: 0;
    position: fixed;
    width: 100%;
`;

const OnboardingActionBar: React.FC<Props> = ({
    canContinue,
    currentStep,
    dataToSave,
}) => {
    const steps = useOnboardingSteps();
    const router = useHistory();
    const nextStepRedirect = useNextStepRedirect();
    const [creatingChannel, setCreatingChannel] = useState(false);
    const upsertChannel = useUpsertChannel();
    const [addAlert] = useAlert();

    const onContinue = async () => {
        const nextStepIndex = currentStep + 1;

        if (nextStepIndex < steps.length) {
            const nextStep = steps[nextStepIndex];

            nextStepRedirect({
                status: nextStep.status,
                ...dataToSave,
            });

            console.log("action bar", nextStep);

            router.push(nextStep.route);
        } else {
            setCreatingChannel(true);
            console.log("onboarding finished. creating channel.");

            try {
                await upsertChannel();
            } catch (error) {
                addAlert({
                    header: "Error",
                    body: "Unable to create channel.",
                    type: "error",
                });
            }

            setCreatingChannel(false);
        }
    };

    return (
        <StyledFlex backgroundColor="white" border="box" padding="medium">
            <Flex justifyContent="flex-end">
                <Button
                    isLoading={creatingChannel}
                    disabled={!canContinue}
                    onClick={onContinue}
                >
                    Continue
                </Button>
            </Flex>
        </StyledFlex>
    );
};

export default OnboardingActionBar;
