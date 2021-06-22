import axios from "axios";
import { OnboardedState } from "../interfaces/interfaces";

const onboardStateApi = {
    async getOnboardedState() {
        const { data }: { data: OnboardedState } = await axios.get(
            "/api/state"
        );
        return data;
    },
    async setOnboardedState(body: OnboardedState) {
        const { data }: { data: OnboardedState } = await axios.post(
            "/api/state",
            body
        );
        return data;
    },
};

export default onboardStateApi;
