import { Box, ProgressCircle } from "@bigcommerce/big-design";
import React from "react";
import styled from "styled-components";

interface LoadingOverlayComponentProps {
    isLoading: boolean;
}

const StyledBox = styled(Box)`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    width: 100%;
    z-index: 2;
    ${({ theme }) => theme.shadow.floating};
`;

const LoadingOverlay: React.FC<LoadingOverlayComponentProps> = ({
    isLoading,
}) => {
    return isLoading ? (
        <StyledBox>
            <ProgressCircle />
        </StyledBox>
    ) : null;
};

export default LoadingOverlay;
