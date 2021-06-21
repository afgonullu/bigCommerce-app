import axios from "axios";
import { OnboardedState } from "../interfaces/interfaces";

const onboardStateApi = {
    async getOnboardedState() {
        const { data }: { data: OnboardedState } = await axios({
            method: "get",
            url: "/api/state",
        });
        return data;
    },
    async setOnboardedState(body: OnboardedState) {
        const { data }: { data: OnboardedState } = await axios({
            method: "post",
            url: "/api/state",
            data: body,
        });
        return data;
    },
};

export default onboardStateApi;
