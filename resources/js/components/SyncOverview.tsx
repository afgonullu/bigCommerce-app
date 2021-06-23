import {
    Box,
    Dropdown,
    Flex,
    FlexItem,
    H2,
    Panel,
    ProgressBar,
    Small,
    Text,
} from "@bigcommerce/big-design";
import React from "react";
import { Sync } from "../interfaces/sync";
import SyncStatusBlock, { SyncStatusBlockProps } from "./SyncStatusBlock";

interface ActionItem {
    content: string;
    disabled: boolean;
    onItemClick(): void;
}

interface Content {
    notRunning: string;
    processing: string;
    readingFromBigCommerce: string;
    writingIntoBigCommerce: string;
    readingFromPlatform: string;
    writingIntoPlatform: string;
}

interface SyncOverviewProps {
    actionItems: ActionItem[];
    actionToggle: React.ReactElement;
    content: Content;
    header: string;
    statsData: SyncStatusBlockProps[];
    syncData: Sync;
    syncIsRunning: boolean;
}

const SyncOverview: React.FC<SyncOverviewProps> = ({
    header,
    actionItems,
    actionToggle,
    content,
    statsData,
    syncData,
    syncIsRunning,
}) => {
    const percentStatus = () => {
        return syncData?.processed_objects && syncData?.total_objects
            ? (syncData.processed_objects / syncData.total_objects) * 100
            : 0;
    };

    const readableStatus = () => {
        let statusText = "";

        if (syncData.status === "reading") {
            statusText =
                syncData.platform === "bigcommerce"
                    ? content.readingFromBigCommerce
                    : content.readingFromPlatform;
        } else if (syncData.status === "writing") {
            statusText =
                syncData.platform === "bigcommerce"
                    ? content.writingIntoBigCommerce
                    : content.writingIntoPlatform;
        }

        return statusText;
    };

    return (
        <Panel>
            <Flex>
                <FlexItem flexGrow={1} paddingRight="small">
                    <H2>{header}</H2>
                </FlexItem>
                <FlexItem flexGrow={0}>
                    <Dropdown items={actionItems} toggle={actionToggle} />
                </FlexItem>
            </Flex>

            {syncIsRunning ? (
                <Box marginVertical="large">
                    <Small>{content.processing}</Small>
                    {syncData.status && (
                        <>
                            {syncData.status !== "writing" && <ProgressBar />}
                            {syncData.status === "writing" && (
                                <ProgressBar percent={percentStatus()} />
                            )}
                        </>
                    )}
                    <Box marginTop="small">
                        <Small>{readableStatus()}</Small>
                    </Box>
                </Box>
            ) : (
                <Text>{content.notRunning}</Text>
            )}

            {!syncIsRunning && statsData && (
                <Flex>
                    {statsData.map((stat: SyncStatusBlockProps, idx) => (
                        <FlexItem
                            flexGrow={1}
                            key={`statusBlock${idx}`}
                            marginRight="small"
                        >
                            <SyncStatusBlock
                                count={stat.count}
                                label={stat.label}
                                variant={stat.variant}
                                onClick={stat.onClick}
                            />
                        </FlexItem>
                    ))}
                </Flex>
            )}
        </Panel>
    );
};

export default SyncOverview;
