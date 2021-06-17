import { Box, Button, Flex } from "@bigcommerce/big-design";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";

import { OnboardedState } from "../interfaces/interfaces";
import { useOnboardingSteps } from "../hooks/useOnboardingSteps";
import useNextStepRedirect from "../hooks/useNextStepRedirect";

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

export const OnboardingActionBar: React.FC<Props> = ({
    canContinue,
    currentStep,
    dataToSave,
}) => {
    const steps = useOnboardingSteps();
    const router = useHistory();
    const nextStepRedirect = useNextStepRedirect();
    const [creatingChannel, setCreatingChannel] = useState(false);
    // const upsertChannel = useUpsertChannel();
    // const [addAlert] = useAlert();

    function onContinue() {
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

            // upsertChannel()
            //     .catch(() => {
            //         console.log("error occured");
            //         // addAlert({
            //         //     header: "Error",
            //         //     body: "Unable to create channel.",
            //         //     type: "error",
            //         // });
            //     })
            //     .finally(() => setCreatingChannel(false));
        }
    }

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
