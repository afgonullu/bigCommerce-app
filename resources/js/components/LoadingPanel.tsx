import {
    Panel as BDPanel,
    PanelProps as BDPanelProps,
} from "@bigcommerce/big-design";
import React from "react";
import styled from "styled-components";

import LoadingOverlay from "./LoadingOverlay";

interface LoadingPanelProps extends BDPanelProps {
    isLoading: boolean;
}

const StyledLoadingPanel = styled.div`
    position: relative;
`;

export const LoadingPanel: React.FC<LoadingPanelProps> = ({
    children,
    isLoading,
    ...rest
}) => {
    return (
        <StyledLoadingPanel>
            <LoadingOverlay isLoading={isLoading} />
            <BDPanel {...rest}>{children}</BDPanel>
        </StyledLoadingPanel>
    );
};
