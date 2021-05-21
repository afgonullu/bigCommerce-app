import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box, Tabs } from "@bigcommerce/big-design";
import InnerHeader from "./InnerHeader";

export const TabIds = {
    HOME: "home",
    PRODUCTS: "products",
};

export const TabRoutes = {
    [TabIds.HOME]: "/",
    [TabIds.PRODUCTS]: "/products",
};

const InnerRoutes = ["/products/:id"];

const HeaderTypes = {
    GLOBAL: "global",
    INNER: "inner",
};

const Header = () => {
    const match = useRouteMatch();
    const router = useHistory();
    const [activeTab, setActiveTab] = useState("");
    const [headerType, setHeaderType] = useState(HeaderTypes.GLOBAL);

    useEffect(() => {
        if (InnerRoutes.includes(match.path)) {
            // Use InnerHeader if route matches inner routes
            setHeaderType(HeaderTypes.INNER);
        } else {
            // Check if new route matches TabRoutes
            const tabKey = Object.keys(TabRoutes).find(
                (key) => TabRoutes[key] === match.path
            );

            // Set the active tab to tabKey or set no active tab if route doesn't match (404)
            setActiveTab(tabKey ?? "");
            setHeaderType(HeaderTypes.GLOBAL);
        }
    }, [match]);

    const items = [
        { id: TabIds.HOME, title: "Home" },
        { id: TabIds.PRODUCTS, title: "Products" },
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);

        return router.push(TabRoutes[tabId]);
    };

    if (headerType === HeaderTypes.INNER) return <InnerHeader />;

    return (
        <Box marginBottom="xxLarge">
            <Tabs
                activeTab={activeTab}
                items={items}
                onTabClick={handleTabClick}
            />
        </Box>
    );
};

export default Header;
