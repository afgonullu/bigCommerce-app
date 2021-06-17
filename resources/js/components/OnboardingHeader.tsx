import { H1, Stepper } from "@bigcommerce/big-design";
import React from "react";
import { useOnboardingSteps } from "../hooks/useOnboardingSteps";
import config from "../utils/config";

interface Props {
    currentStep: number;
}

export const OnboardingHeader: React.FC<Props> = ({ currentStep }) => {
    const steps = useOnboardingSteps();

    return (
        <>
            <H1>{`Set up ${config.NEXT_PUBLIC_CHANNEL_NAME}`}</H1>
            <Stepper
                steps={steps
                    .map((step: { name: any }) => step.name)
                    .filter(
                        (stepName: any, index: any, self: string | any[]) =>
                            self.indexOf(stepName) === index
                    )}
                currentStep={currentStep}
            />
        </>
    );
};
