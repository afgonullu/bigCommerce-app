import { Form, FormGroup, Select } from "@bigcommerce/big-design";
import React, { useEffect, useState } from "react";
import { LoadingPanel } from "../../components/LoadingPanel";
import { OnboardingActionBar } from "../../components/OnboardingActionBar";
import { OnboardingHeader } from "../../components/OnboardingHeader";
import useNextStepRedirect from "../../hooks/useNextStepRedirect";
import { Channel } from "../../interfaces/channels";
import channelsApi from "../../services/channels";

const Storefront: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectedStorefront, setSelectedStorefront] =
        useState<number | undefined>(undefined);
    const nextStepRedirect = useNextStepRedirect();

    useEffect(() => {
        setIsLoading(true);
        const fetch = async () => {
            const channels = await channelsApi.getChannels();
            const fronts = channels.data.filter(
                (channel: Channel) => channel.type === "storefront"
            );
            if (fronts.length === 1) {
                nextStepRedirect({
                    status: "step_requirements",
                    storefrontChannelId: fronts[0].id,
                });
            } else {
                setSelectOptions(
                    fronts.map((storefront: Channel) => ({
                        content: storefront.name,
                        value: storefront.id,
                    }))
                );
            }
            setIsLoading(false);
        };
        fetch();
    }, []);

    return (
        <>
            <OnboardingHeader currentStep={0} />
            <LoadingPanel header="Storefront" isLoading={isLoading}>
                <Form>
                    <FormGroup>
                        <Select
                            id="select-storefront"
                            options={selectOptions}
                            onOptionChange={(option) =>
                                setSelectedStorefront(option)
                            }
                            value={selectedStorefront}
                            description="Products from this storefront will be used in the channel"
                            label="Select Storefront to sync with"
                            labelId="select-storefront-label"
                            required
                        />
                    </FormGroup>
                </Form>
            </LoadingPanel>
            <OnboardingActionBar
                canContinue={Boolean(selectedStorefront)}
                currentStep={0}
                dataToSave={{
                    storefrontChannelId: selectedStorefront,
                }}
            />
        </>
    );
};

export default Storefront;
