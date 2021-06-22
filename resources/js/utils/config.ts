const NEXT_PUBLIC_CHANNEL_NAME = process.env.MIX_NEXT_PUBLIC_CHANNEL_NAME;
const NEXT_PUBLIC_CHANNEL_TYPE = process.env.MIX_NEXT_PUBLIC_CHANNEL_TYPE;
const NEXT_PUBLIC_CHANNEL_PLATFORM =
    process.env.MIX_NEXT_PUBLIC_CHANNEL_PLATFORM;
const NEXT_PUBLIC_CHANNEL_LISTABLE_FROM_UI =
    process.env.MIX_NEXT_PUBLIC_CHANNEL_LISTABLE_FROM_UI;
const NEXT_PUBLIC_CHANNEL_PLATFORM_CLIENT_ID =
    process.env.MIX_NEXT_PUBLIC_CHANNEL_PLATFORM_CLIENT_ID;
const NEXT_PUBLIC_CHANNEL_PLATFORM_AUTH_WINDOW_URL =
    process.env.MIX_NEXT_PUBLIC_CHANNEL_PLATFORM_AUTH_WINDOW_URL;
const APP_ID = process.env.MIX_APP_ID;
const CLIENT_ID = process.env.MIX_CLIENT_ID;

export default {
    NEXT_PUBLIC_CHANNEL_LISTABLE_FROM_UI,
    NEXT_PUBLIC_CHANNEL_NAME,
    NEXT_PUBLIC_CHANNEL_PLATFORM,
    NEXT_PUBLIC_CHANNEL_PLATFORM_AUTH_WINDOW_URL,
    NEXT_PUBLIC_CHANNEL_PLATFORM_CLIENT_ID,
    NEXT_PUBLIC_CHANNEL_TYPE,
    APP_ID,
    CLIENT_ID,
};
