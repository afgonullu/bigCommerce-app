import { CheckCircleIcon, WarningIcon } from "@bigcommerce/big-design-icons";
import { Box, Flex, FlexItem, H3, Link, Small } from "@bigcommerce/big-design";
import React from "react";
import { Requirement as RequirementProps } from "../interfaces/requirement";

const Requirement: React.FC<RequirementProps> = ({
    header,
    description,
    ctaUrl,
    status,
}) => {
    return (
        <Box borderBottom="box" marginBottom="medium">
            <Flex>
                {status === "success" ? (
                    <CheckCircleIcon color="success" size="xxLarge" />
                ) : (
                    <WarningIcon color="warning" size="xxLarge" />
                )}
                <FlexItem
                    flexGrow={1}
                    marginHorizontal="small"
                    marginBottom="medium"
                >
                    <H3>{header}</H3>
                    <Small>{description}</Small>
                </FlexItem>
                <FlexItem alignSelf="center" flexGrow={1}>
                    <Link href={ctaUrl} external>
                        Make required changes
                    </Link>
                </FlexItem>
            </Flex>
        </Box>
    );
};

export default Requirement;
