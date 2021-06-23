import axios from "axios";
import { Sync } from "../interfaces/sync";
import config from "../utils/config";
import onboardStateApi from "./onboardState";

const getRequiredData = async () => {
    const { data: accessToken } = await axios.get("api/accessToken");
    const {
        managedChannelId,
        platformBusinessId,
        storefrontChannelId,
        platformAccessToken,
        store_hash,
    } = await onboardStateApi.getOnboardedState();
    const syncEngineBaseUrl = config.SYNC_ENGINE_BASE_URL;
    const channelPlatform = config.NEXT_PUBLIC_CHANNEL_PLATFORM;

    return {
        accessToken,
        managedChannelId,
        platformBusinessId,
        storefrontChannelId,
        platformAccessToken,
        store_hash,
        syncEngineBaseUrl,
        channelPlatform,
    };
};

const syncApi = {
    async startSync() {
        const {
            accessToken,
            managedChannelId,
            platformBusinessId,
            storefrontChannelId,
            platformAccessToken,
            store_hash,
            syncEngineBaseUrl,
            channelPlatform,
        } = await getRequiredData();

        if (!config.CLIENT_ID) {
            throw new Error("Missing Client ID");
        }

        const headers = {
            "X-Auth-Client": config.CLIENT_ID,
            "X-Auth-Token": accessToken,
            "Content-Type": "application/json",
        };

        if (!platformBusinessId || !storefrontChannelId || !managedChannelId) {
            throw new Error("Missing platform data");
        }

        const body = {
            external_platform_account_id: platformBusinessId,
            external_platform_access_token: platformAccessToken,
            storefront_channel_id: storefrontChannelId.toString(),
            destination_channel_id: managedChannelId.toString(),
        };

        const result: Sync = await axios.post(
            `${syncEngineBaseUrl}/${store_hash?.substr(
                7
            )}/${channelPlatform}/sync`,
            body,
            { headers }
        );

        return result;
    },
    async getSyncStatus() {
        const {
            accessToken,
            managedChannelId,
            platformBusinessId,
            storefrontChannelId,
            syncEngineBaseUrl,
            store_hash,
            channelPlatform,
        } = await getRequiredData();

        if (!config.CLIENT_ID) {
            throw new Error("Missing Client ID");
        }

        const headers = {
            "X-Auth-Client": config.CLIENT_ID,
            "X-Auth-Token": accessToken,
        };

        if (!platformBusinessId || !storefrontChannelId || !managedChannelId) {
            throw new Error("Missing platform data");
        }

        const queryStringParams = new URLSearchParams({
            external_platform_account_id: platformBusinessId,
            storefront_channel_id: storefrontChannelId.toString(),
            destination_channel_id: managedChannelId.toString(),
        }).toString();

        const result: Sync = await axios.get(
            `${syncEngineBaseUrl}/${store_hash?.substr(
                7
            )}/${channelPlatform}/sync?${queryStringParams}`,
            { headers }
        );

        return result;
    },
    async stopSync() {
        const {
            accessToken,
            managedChannelId,
            platformBusinessId,
            storefrontChannelId,
            syncEngineBaseUrl,
            store_hash,
            channelPlatform,
        } = await getRequiredData();

        if (!config.CLIENT_ID) {
            throw new Error("Missing Client ID");
        }

        const headers = {
            "X-Auth-Client": config.CLIENT_ID,
            "X-Auth-Token": accessToken,
        };

        if (!platformBusinessId || !storefrontChannelId || !managedChannelId) {
            throw new Error("Missing platform data");
        }

        const queryStringParams = new URLSearchParams({
            external_platform_account_id: platformBusinessId,
            storefront_channel_id: storefrontChannelId.toString(),
            destination_channel_id: managedChannelId.toString(),
        }).toString();

        const result: Sync = await axios.delete(
            `${syncEngineBaseUrl}/${store_hash?.substr(
                7
            )}/${channelPlatform}/sync?${queryStringParams}`,
            { headers }
        );

        return result;
    },
};

export default syncApi;
