export type OnboardedStatus =
    | "step_storefront_select"
    | "step_requirements"
    | "step_connection"
    | "step_connection_ready"
    | "onboarded";

export interface OnboardedState {
    store_hash?: string;
    status: OnboardedStatus;
    storefrontChannelId?: number;
    managedChannelId?: number;
    platformAccessToken?: string;
    platformBusinessId?: string;
    platformAccountId?: string;
    platformAnalyticsId?: string;
    platformUserProfile?: string;
}
