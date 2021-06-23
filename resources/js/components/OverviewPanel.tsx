import {
    Badge,
    PanelProps as BDPanelProps,
    Box,
    Button,
    Flex,
    FlexItem,
    H2,
    Panel,
    Text,
} from "@bigcommerce/big-design";
import React from "react";

interface OverviewPanelProps extends BDPanelProps {
    accountLabel: string;
    accountName?: string;
    description: string;
    statusLabel: string;
    statusVariant: "danger" | "success" | "secondary" | "warning";
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({
    accountLabel,
    accountName,
    action,
    children,
    description,
    header,
    statusLabel,
    statusVariant,
}) => {
    return (
        <Panel>
            <Flex>
                <FlexItem flexGrow={0} paddingRight="small">
                    <H2>{header}</H2>
                </FlexItem>
                <FlexItem flexGrow={1}>
                    <Badge
                        label={statusLabel}
                        variant={statusVariant}
                        marginTop={{ mobile: "none", tablet: "xSmall" }}
                        marginBottom={{ mobile: "medium", tablet: "none" }}
                    />
                </FlexItem>
                <FlexItem flexGrow={0}>
                    {action && <Button {...action}>{action.text}</Button>}
                </FlexItem>
            </Flex>
            <Box marginTop={{ mobile: "small", tablet: "none" }}>
                <Text>{description}</Text>
            </Box>
            <Box marginTop="small">
                <Text as="span" bold>
                    {accountLabel}:
                </Text>{" "}
                <Text as="span">{accountName ? accountName : "N/A"}</Text>
            </Box>
            {children}
        </Panel>
    );
};

export default OverviewPanel;
