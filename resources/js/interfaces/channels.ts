export type ChannelType = "pos" | "marketplace" | "storefront" | "marketing";
export type ChannelPlatform =
    | "bigcommerce"
    | "acquia"
    | "bloomreach"
    | "deity"
    | "drupal"
    | "next"
    | "wordpress"
    | "amazon"
    | "ebay"
    | "facebook"
    | "google_shopping"
    | "clover"
    | "square"
    | "vend"
    | "custom";
export type ChannelStatus =
    | "active"
    | "prelaunch"
    | "inactive"
    | "connected"
    | "disconnected"
    | "deleted"
    | "terminated";
export interface Channel {
    id?: number;
    type: ChannelType;
    platform: ChannelPlatform;
    date_created?: string;
    date_modified?: string;
    config_meta?: {
        app?: {
            id?: number;
            sections?: {
                title?: string;
                query_path?: string;
            }[];
        };
    };
    external_id?: string;
    is_listable_from_ui?: boolean;
    is_visible?: boolean;
    name: string;
    status?: ChannelStatus;
    icon_url: string;
}
