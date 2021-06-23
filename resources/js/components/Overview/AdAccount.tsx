import React from "react";
import OverviewPanel from "../OverviewPanel";

interface Props {
    accountName?: string;
}

const AdAccount: React.FC<Props> = ({ accountName }) => {
    const onClick = () => {
        console.log("Navigate to Business Center");
    };

    return (
        <OverviewPanel
            accountLabel="Account ID"
            accountName={accountName}
            action={{
                variant: "secondary",
                text: "Manage",
                onClick,
            }}
            description="Create ads with your ad account"
            header="Ad Account"
            statusLabel="connected"
            statusVariant="success"
        />
    );
};
export default AdAccount;
