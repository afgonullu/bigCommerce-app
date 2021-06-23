import axios from "axios";
import { Script } from "../interfaces/script";
import onboardStateApi from "./onboardState";

import { addToCart } from "../../scripts/storefront/_addtocart.template";
import { identify } from "../../scripts/storefront/_identify.template";
import { initialize } from "../../scripts/storefront/_initialize.template";
import { orderComplete } from "../../scripts/storefront/_ordercomplete.template";
import { startCheckout } from "../../scripts/storefront/_startcheckout.template";
import { viewContent } from "../../scripts/storefront/_viewcontent.template";
// import config from "../utils/config";

const scriptsApi = {
    async installStorefrontScripts() {
        const integrationState = await onboardStateApi.getOnboardedState();
        const scriptTags = [
            {
                name: "Base Code",
                description: "Tracking tag with page visit event",
                location: "head",
                visibility: "all_pages",
                template: initialize,
            },
            {
                name: "Advanced Matching",
                description: "Tracking tag to identify customers",
                location: "head",
                visibility: "all_pages",
                template: identify,
            },
            {
                name: "View Product Event",
                description: "Tracking tag for viewing a product page",
                location: "head",
                visibility: "storefront",
                template: viewContent,
            },
            {
                name: "Add to Cart Event",
                description: "Tracking tag for add to cart button on PDP",
                location: "footer", // This event loads in the footer so the PDP form has time to render (otherwise the form listener won't be able to attach)
                visibility: "storefront",
                template: addToCart,
            },
            {
                name: "Start Checkout Event",
                description: "Tracking tag for starting the checkout process",
                location: "head",
                visibility: "checkout",
                template: startCheckout,
            },
            {
                name: "Purchase Event",
                description: "Tracking tag for a purchase",
                location: "head",
                visibility: "order_confirmation",
                template: orderComplete,
            },
        ];

        // const { data: existingScripts }: { data: Script[] } = await axios.get(
        //     `/bc-api/v3/content/scripts?channel_id=${integrationState.managedChannelId}&api_client_id=${config.CLIENT_ID}`
        // );

        const addedScripts: Script[] = [];
        for (const script of scriptTags) {
            // const filteredScriptsList = existingScripts.filter(
            //     (x) => x.name === script.name
            // );

            // // If there is already a script with the same name added by this app, return it instead of creating another one
            // if (filteredScriptsList.length > 0) {
            //     addedScripts.push(filteredScriptsList[0]);
            //     continue;
            // }

            const templateHTML = script.template;

            const scriptHTML = templateHTML.replace(
                /<%= property_id %>/g,
                integrationState.platformAnalyticsId!
            );

            const scriptCreateRequest = {
                channel_id: integrationState.storefrontChannelId,
                name: script.name,
                description: script.description,
                html: scriptHTML,
                auto_uninstall: true,
                load_method: "default",
                location: script.location,
                visibility: script.visibility,
                kind: "script_tag",
                consent_category: "analytics",
                enabled: true,
            };

            const { data: scriptCreateResponse } = await axios.post(
                "/bc-api/v3/content/scripts",
                scriptCreateRequest
            );

            addedScripts.push(scriptCreateResponse);
        }

        return addedScripts;
    },
};

export default scriptsApi;
