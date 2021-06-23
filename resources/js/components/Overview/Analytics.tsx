import { Small } from "@bigcommerce/big-design";
import React, { useState } from "react";
import OverviewPanel from "../OverviewPanel";
import OverviewPanelToggle from "../OverviewPanelToggle";

interface Props {
    accountName?: string;
}

const Analytics: React.FC<Props> = ({ accountName }) => {
    const [isAdvancedMatching, setIsAdvancedMatching] = useState(true);
    const updatingScriptStatus = false;

    const onClick = () => {
        console.log("Navigate to Ad Center");
    };

    return (
        <OverviewPanel
            accountLabel="Pixel ID"
            accountName={accountName}
            action={{
                variant: "secondary",
                text: "Manage",
                onClick,
            }}
            description="Create ads with your ad account"
            header="Pixel"
            statusLabel="connected"
            statusVariant="success"
        >
            <OverviewPanelToggle
                checked={isAdvancedMatching}
                disabled={updatingScriptStatus}
                disabledText="Advanced matching disabled"
                enabledText="Advanced matching enabled"
                label="Advanced Matching"
                onChange={() =>
                    setIsAdvancedMatching((isEnabled) => !isEnabled)
                }
            >
                <Small>
                    By enabling advanced matching you agree to share customer
                    details data, which includes email, phone number, name and
                    location. This could increase your retargeting audience,
                    drive better conversion attribution, and improve your
                    campaign performance.{" "}
                    <a href="#" target="_blank">
                        View our Terms and Conditions
                    </a>
                    .
                </Small>
            </OverviewPanelToggle>
        </OverviewPanel>
    );
};

export default Analytics;
