import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ApiService } from "../services/index";
import { TabIds, TabRoutes } from "./Header";
import { Box, Button, H1, HR, Text } from "@bigcommerce/big-design";
import { ArrowBackIcon } from "@bigcommerce/big-design-icons";

const InnerHeader: React.FC = () => {
    const router = useHistory();
    let { id } = useParams<{ id: string }>();
    const [name, setName] = useState("");

    const handleBackClick = () => router.push(TabRoutes[TabIds.PRODUCTS]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await ApiService.getProductById(id);
            const { name } = data.data ?? {};
            setName(name);
        };
        fetchData();
    }, []);

    return (
        <Box marginBottom="xxLarge">
            <Button
                iconLeft={<ArrowBackIcon color="secondary50" />}
                variant="subtle"
                onClick={handleBackClick}
            >
                <Text bold color="secondary50">
                    Products
                </Text>
            </Button>
            {name && <H1>{name}</H1>}
            <HR color="secondary30" />
        </Box>
    );
};

export default InnerHeader;
