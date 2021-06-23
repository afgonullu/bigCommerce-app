import React from "react";
import OverviewPanel from "../OverviewPanel";

interface Props {
    accountName?: string;
}

const BusinessCenter: React.FC<Props> = ({ accountName }) => {
    const onClick = () => {
        console.log("Navigate to Business Center");
    };

    return (
        <OverviewPanel
            accountLabel="Business ID"
            accountName={accountName}
            action={{
                variant: "secondary",
                text: "Manage",
                onClick,
            }}
            description="The Business Center that owns all your ad accounts"
            header="Business Center"
            statusLabel="connected"
            statusVariant="success"
        />
    );
};

export default BusinessCenter;
