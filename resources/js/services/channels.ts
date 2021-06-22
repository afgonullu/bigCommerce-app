import axios from "axios";
import { Channel } from "../interfaces/channels";
import config from "../utils/config";
import onboardStateApi from "./onboardState";

const channelsApi = {
    async getChannels() {
        const { data } = await axios.get("/bc-api/v3/channels");
        return data;
    },
    async setChannels(storeHash: string) {
        if (!config.APP_ID) {
            return { error: "Missing APP_ID" };
        }

        const { data } = await this.getChannels();

        const existingChannel = data.filter(
            (channel: Channel) =>
                channel.type === config.NEXT_PUBLIC_CHANNEL_TYPE &&
                channel.platform === config.NEXT_PUBLIC_CHANNEL_PLATFORM &&
                channel.config_meta?.app?.id === config.APP_ID
        );

        if (existingChannel.length > 0) {
            const existingChannelId = existingChannel[0].id;
            const channelManagerUrl = `https://store-${storeHash.substr(
                7
            )}.mybigcommerce.com/manage/channel/${existingChannelId}/app?id=${
                config.APP_ID
            }`;

            await onboardStateApi.setOnboardedState({
                status: "onboarded",
                managedChannelId: existingChannelId,
            });

            return {
                channel: existingChannel[0],
                channel_manager_url: channelManagerUrl,
            };
        } else {
            // Beware of Bigcommerce Validation for platform, type, status
            // https://developer.bigcommerce.com/api-reference/store-management/channels#status
            const channel = {
                is_listable_from_ui:
                    config.NEXT_PUBLIC_CHANNEL_LISTABLE_FROM_UI === "true",
                is_visible: true,
                name: config.NEXT_PUBLIC_CHANNEL_NAME,
                status: "connected",
                type: config.NEXT_PUBLIC_CHANNEL_TYPE,
                platform: config.NEXT_PUBLIC_CHANNEL_PLATFORM,
                config_meta: {
                    app: {
                        id: parseInt(config.APP_ID),
                        sections: [
                            {
                                title: "Overview",
                                query_path: "overview",
                            },
                            {
                                title: "Analytics",
                                query_path: "analytics",
                            },
                            {
                                title: "Settings",
                                query_path: "settings",
                            },
                        ],
                    },
                },
            };


            const response = await axios.post("/bc-api/v3/channels", channel);


            const createdChannelId = response.data.data.id;
            const channelManagerUrl = `https://store-${storeHash.substr(
                7
            )}.mybigcommerce.com/manage/channel/${createdChannelId}/app?id=${
                config.APP_ID
            }`;

            await onboardStateApi.setOnboardedState({
                status: "onboarded",
                managedChannelId: createdChannelId,
            });

            return {
                channel: response.data.data,
                channel_manager_url: channelManagerUrl,
            };
        }
    },
};

export default channelsApi;
