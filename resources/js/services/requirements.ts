// import axios from "axios";

import { Requirement } from "../interfaces/requirement";

const requirementsApi = {
    async getRequirements() {
        const requirements: Requirement[] = [
            {
                header: "Lorem ipsum",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nostrum id porro debitis inventore",
                ctaUrl: "google.com",
                status: "success",
            },
            {
                header: "Lorem ipsum",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nostrum id porro debitis inventore",
                ctaUrl: "google.com",
                status: "success",
            },
        ];
        return requirements;
    },
};

export default requirementsApi;
