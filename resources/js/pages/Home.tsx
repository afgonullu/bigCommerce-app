import React, { useEffect, useState } from "react";
import { ApiService } from "../services/ApiService";
import { Box, Flex, H1, H4, Panel } from "@bigcommerce/big-design";
import styled from "styled-components";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { Summary } from "../interfaces/interfaces";

const Home: React.FC = () => {
    const [summary, setSummary] = useState<Summary>();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await ApiService.getSummary();
            setSummary(data.data);
        };
        fetchData();
    }, []);

    if (!summary) return <Loading />;

    return (
        <>
            <Header />
            <Panel header="Homepage">
                <Flex>
                    <StyledBox
                        border="box"
                        borderRadius="normal"
                        marginRight="xLarge"
                        padding="medium"
                    >
                        <H4>Inventory count</H4>
                        <H1 marginBottom="none">{summary.inventory_count}</H1>
                    </StyledBox>
                    <StyledBox
                        border="box"
                        borderRadius="normal"
                        marginRight="xLarge"
                        padding="medium"
                    >
                        <H4>Variant count</H4>
                        <H1 marginBottom="none">{summary.variant_count}</H1>
                    </StyledBox>
                    <StyledBox
                        border="box"
                        borderRadius="normal"
                        padding="medium"
                    >
                        <H4>Primary category</H4>
                        <H1 marginBottom="none">
                            {summary.primary_category_name}
                        </H1>
                    </StyledBox>
                </Flex>
            </Panel>
        </>
    );
};

const StyledBox = styled(Box)`
    min-width: 10rem;
`;

export default Home;
