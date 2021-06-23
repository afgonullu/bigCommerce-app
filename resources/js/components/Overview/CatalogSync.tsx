import { ArrowDropDownIcon } from "@bigcommerce/big-design-icons";
import { Button } from "@bigcommerce/big-design";
import React, { useCallback, useEffect, useState } from "react";
import { Sync } from "../../interfaces/sync";
import SyncOverview from "../SyncOverview";
import config from "../../utils/config";
import syncApi from "../../services/sync";
import { useAlert } from "../../hooks/useAlert";

const CatalogSync: React.FC = () => {
    const [addAlert] = useAlert();
    const [syncDataIsLoading, setSyncDataIsLoading] = useState(false);
    const [syncData, setSyncData] = useState<Sync>({
        status: null,
        processed_objects: 0,
        total_objects: 0,
        platform: "bigcommerce",
    });
    const syncIsRunning =
        syncData.status !== null &&
        syncData.status !== "complete" &&
        syncData.status !== "stopped" &&
        syncData.status !== "error";

    const checkSyncStatus = useCallback(
        async (showLoadingIndicator = false) => {
            if (showLoadingIndicator) {
                setSyncDataIsLoading(true);
            }

            try {
                const result = await syncApi.getSyncStatus();
                setSyncData(result);

                if (showLoadingIndicator) {
                    setSyncDataIsLoading(false);
                }
            } catch (error) {
                addAlert({
                    header: "Error",
                    body: "An error occured while fetching sync",
                    type: "error",
                });

                if (showLoadingIndicator) {
                    setSyncDataIsLoading(false);
                }
            }
        },
        []
    );

    const addProducts = useCallback(async () => {
        setSyncDataIsLoading(true);

        try {
            const result = await syncApi.startSync();
            setSyncData(result);
            checkSyncStatus();
            setSyncDataIsLoading(false);
            addAlert({
                header: "Success",
                body: "Catalog sync has started",
                type: "success",
            });
        } catch (error) {
            setSyncDataIsLoading(false);
            addAlert({
                header: "Error",
                body: "An error occured while starting sync",
                type: "error",
            });
        }
    }, [checkSyncStatus]);

    const onStopSync = async () => {
        setSyncDataIsLoading(true);
        try {
            await syncApi.stopSync();
            setSyncDataIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let timeoutId = 0;

        if (syncIsRunning) {
            timeoutId = window.setTimeout(() => checkSyncStatus(), 3000);
        }

        return () => clearTimeout(timeoutId);
    }, [syncData, checkSyncStatus, syncIsRunning]);

    useEffect(() => {
        checkSyncStatus(true);
    }, [checkSyncStatus]);

    return (
        <SyncOverview
            actionItems={[
                {
                    content: "Add products",
                    onItemClick: addProducts,
                    disabled: syncIsRunning,
                },
                {
                    content: "Stop sync",
                    onItemClick: onStopSync,
                    disabled: !syncIsRunning,
                },
            ]}
            actionToggle={
                <Button
                    variant="primary"
                    isLoading={syncDataIsLoading}
                    iconRight={<ArrowDropDownIcon />}
                >
                    Manage
                </Button>
            }
            content={{
                notRunning: `Once your BigCommerce products are synced to ${config.NEXT_PUBLIC_CHANNEL_NAME}, they will be available within search results. Changes made to your products on BigCommerce will be synced daily and updated on ${config.NEXT_PUBLIC_CHANNEL_NAME}`,
                processing:
                    "While the feed is being processed in the background you can leave this screen and come back later when it's complete.",
                readingFromBigCommerce: `Fetching ${syncData.processed_objects} of ${syncData.total_objects} pages of products from BigCommerce`,
                writingIntoBigCommerce: `Updating ${syncData.processed_objects} of ${syncData.total_objects} product variants in ${config.NEXT_PUBLIC_CHANNEL_NAME}`,
                readingFromPlatform: `Fetching ${syncData.processed_objects} of ${syncData.total_objects} items from ${config.NEXT_PUBLIC_CHANNEL_NAME}`,
                writingIntoPlatform: `Writing ${syncData.processed_objects} of ${syncData.total_objects} product variants into ${config.NEXT_PUBLIC_CHANNEL_NAME}`,
            }}
            header="Catalog"
            statsData={[
                {
                    count: 300,
                    label: "Listed",
                    variant: "primary",
                    onClick: () => console.log("Navigate to Listed"),
                },
                {
                    count: 100,
                    label: "Pending",
                    variant: "secondary",
                    onClick: () => console.log("Navigate to Pending"),
                },
                {
                    count: 20,
                    label: "Errors",
                    variant: "danger",
                    onClick: () => console.log("Navigate to Errors"),
                },
                {
                    count: 15,
                    label: "Issues",
                    variant: "warning",
                    onClick: () => console.log("Navigate to Issues"),
                },
                {
                    count: 165,
                    label: "Active",
                    variant: "success",
                    onClick: () => console.log("Navigate to Active"),
                },
            ]}
            syncData={syncData}
            syncIsRunning={syncIsRunning}
        />
    );
};

export default CatalogSync;
