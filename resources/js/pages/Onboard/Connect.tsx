import {
    Button,
    Flex,
    FlexItem,
    ProgressCircle,
    Text,
} from "@bigcommerce/big-design";
import React, { useCallback, useEffect, useState } from "react";
import { LoadingPanel } from "../../components/LoadingPanel";
import { OnboardingActionBar } from "../../components/OnboardingActionBar";
import { OnboardingHeader } from "../../components/OnboardingHeader";
import { useConnectPopup } from "../../hooks/useConnectPopup";
import { useExchangeAuthCode } from "../../hooks/useExchangeAuthCode";
import useNextStepRedirect from "../../hooks/useNextStepRedirect";
import { useStatusPoller } from "../../hooks/useStatusPoller";
import { OnboardedState } from "../../interfaces/interfaces";
import { onboardStateApi } from "../../services";
import config from "../../utils/config";

const Connect: React.FC = () => {
    const [onboardedState, setOnboardedState] =
        useState<OnboardedState | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const authReady = onboardedState?.status === "step_connection_ready";
    const {
        startPoller,
        stopPoller,
        isPolling: isConnecting,
    } = useStatusPoller();
    const [userProfile, setUserProfile] =
        useState<{ email: string; avatar: string } | null>(null);
    const nextStepRedirect = useNextStepRedirect();
    const openPopup = useConnectPopup();
    const exchangeAuthCode = useExchangeAuthCode();
    // const [addAlert] = useAlert();

    const connect = useCallback(async () => {
        try {
            console.log("starting");
            const data = await exchangeAuthCode(456);
            const newState: OnboardedState = {
                ...data,
                status: "step_connection_ready",
            };
            setUserProfile({
                email: data.platformUserProfile!.email,
                avatar: data.platformUserProfile!.avatar,
            });
            nextStepRedirect(newState);
            setOnboardedState(newState);
            stopPoller();
        } catch (error) {}
        // const resetState: OnboardedState = {
        //     ...onboardedState,
        //     status: "step_connection",
        // };
        // nextStepRedirect(resetState);
        // setOnboardedState(resetState);

        // openPopup();

        // window.addEventListener(
        //     "message",
        //     async (e) => {
        //         console.log("Child Window Message Event: ", e);

        //         try {
        //             console.log("starting");
        //             const { email, avatar } = await exchangeAuthCode(
        //                 e.data.code
        //             );
        //             const newState: OnboardedState = {
        //                 ...onboardedState,
        //                 status: "step_connection_ready",
        //             };
        //             setUserProfile({ email, avatar });
        //             nextStepRedirect(newState);
        //             setOnboardedState(newState);
        //             stopPoller();
        //         } catch (error) {}
        //     },
        //     false
        // );

        // startPoller();
    }, [
        startPoller,
        stopPoller,
        openPopup,
        exchangeAuthCode,
        nextStepRedirect,
    ]);

    const panelAction = authReady
        ? {
              text: "Switch Account",
              variant: "secondary" as const,
              onClick: connect,
          }
        : undefined;

    // useOnboardRedirect();

    useEffect(() => {
        if (authReady && !userProfile && onboardedState?.platformUserProfile) {
            const { email, avatar } = onboardedState.platformUserProfile;
            setUserProfile({ email, avatar });
        }
    }, [authReady, userProfile, onboardedState?.platformUserProfile]);

    useEffect(() => {
        setIsLoading(true);

        const fetch = async () => {
            const onboardingState = await onboardStateApi.getOnboardedState();
            setOnboardedState(onboardingState);
            setIsLoading(false);
        };
        fetch();
    }, []);

    return (
        <>
            <OnboardingHeader currentStep={3} />
            <LoadingPanel
                action={panelAction}
                header={`${config.NEXT_PUBLIC_CHANNEL_NAME} Account`}
                isLoading={isLoading}
            >
                {authReady && userProfile ? (
                    <Flex alignItems="center">
                        <img
                            src={userProfile.avatar}
                            style={{ maxHeight: "36px" }}
                        />
                        <FlexItem flexGrow={1} marginLeft="medium">
                            <Text>{userProfile.email}</Text>
                        </FlexItem>
                    </Flex>
                ) : (
                    <>
                        <Text>
                            {`Connect your ${config.NEXT_PUBLIC_CHANNEL_NAME} account with BigCommerce to complete setting up this channel.`}
                        </Text>
                        {isConnecting ? (
                            <Flex>
                                <ProgressCircle size="medium" />
                                <FlexItem
                                    alignSelf="center"
                                    marginLeft="medium"
                                >
                                    <Text>Connecting</Text>
                                </FlexItem>
                            </Flex>
                        ) : (
                            <Button onClick={connect}>
                                {`Connect ${config.NEXT_PUBLIC_CHANNEL_NAME}`}
                            </Button>
                        )}
                    </>
                )}
            </LoadingPanel>
            <OnboardingActionBar canContinue={authReady} currentStep={3} />
        </>
    );
};

export default Connect;
