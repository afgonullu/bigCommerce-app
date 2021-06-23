import { useCallback } from "react";
import channelsApi from "../services/channels";
import onboardStateApi from "../services/onboardState";
import scriptsApi from "../services/scripts";

const useUpsertChannel = () => {
    return useCallback(async () => {
        const data = await onboardStateApi.getOnboardedState();
        const response = await channelsApi.setChannels(data.store_hash!);
        await scriptsApi.installStorefrontScripts();
        window.location.href = response.channel_manager_url!;
    }, []);
};

export default useUpsertChannel;
