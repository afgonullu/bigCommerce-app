import axios from "axios";
import { useCallback } from "react";
import { UserProfile } from "../interfaces/userProfile";

export function useExchangeAuthCode() {
    return useCallback(async (code) => {
        console.log("here");
        const { data }: { data: UserProfile } = await axios.post(
            "/api/exchange_auth_code",
            {
                body: JSON.stringify({
                    code,
                }),
            }
        );
        console.log("response profile", data);
        return data;
    }, []);
}
