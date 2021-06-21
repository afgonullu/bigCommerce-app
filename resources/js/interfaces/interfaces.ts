import { UserProfile } from "./userProfile";

export interface FormData {
    description: string;
    isVisible: boolean;
    name: string;
    price: number;
    type: string;
}

export interface TableItem {
    id: number;
    name: string;
    price: number;
    inventory_level: number;
}

export interface ListItem extends FormData {
    id: number;
}

export interface StringKeyValue {
    [key: string]: string;
}

export interface Summary {
    inventory_count: number;
    variant_count: number;
    inventory_value: number;
    highest_variant_price: number;
    average_variant_price: number;
    lowest_variant_price: number;
    oldest_variant_date: string;
    newest_variant_date: string;
    primary_category_id: number;
    primary_category_name: string;
}

export interface IFormErrors {
    [key: string]: string;
    name: string;
    price: string;
}

export type OnboardedStatus =
    | "step_storefront_select"
    | "step_requirements"
    | "step_connection"
    | "step_connection_ready"
    | "onboarded";

export interface OnboardedState {
    status: OnboardedStatus;
    storefrontChannelId?: number;
    managedChannelId?: number;
    platformBusinessId?: string;
    platformAccountId?: string;
    platformAnalyticsId?: string;
    platformUserProfile?: UserProfile;
}
