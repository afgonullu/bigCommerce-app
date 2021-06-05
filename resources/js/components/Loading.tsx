import React from "react";
import { Flex, H3, Panel, ProgressCircle } from "@bigcommerce/big-design";

const Loading: React.FC = () => (
    <Panel>
        <H3>Loading...</H3>
        <Flex justifyContent="center" alignItems="center">
            <ProgressCircle size="large" />
        </Flex>
    </Panel>
);

export default Loading;
