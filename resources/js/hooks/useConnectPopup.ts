import { useCallback } from "react";
import config from "../utils/config";

export function useConnectPopup() {
    return useCallback(() => {
        window.open(
            `${config.NEXT_PUBLIC_CHANNEL_PLATFORM_AUTH_WINDOW_URL}?client_id=${config.NEXT_PUBLIC_CHANNEL_PLATFORM_CLIENT_ID}`,
            "platformAuthWindow",
            "height=500,width=400,left=800,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,directories=no,status=yes"
        );
    }, []);
}
