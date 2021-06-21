import axios from "axios";
import { useCallback } from "react";
import { OnboardedState } from "../interfaces/interfaces";

export function useExchangeAuthCode() {
    return useCallback(async (code) => {
        console.log("here");
        const { data }: { data: OnboardedState } = await axios.post(
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
