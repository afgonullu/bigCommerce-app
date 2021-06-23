import { Box, Flex, FlexItem, Switch, Text } from "@bigcommerce/big-design";
import React from "react";

interface OverviewPanelToggleProps {
    label: string;
    checked: boolean;
    disabled: boolean;
    disabledText: string;
    enabledText: string;
    onChange: () => void;
}

const OverviewPanelToggle: React.FC<OverviewPanelToggleProps> = ({
    label,
    checked,
    children,
    disabled,
    disabledText,
    enabledText,
    onChange,
}) => {
    return (
        <>
            <Box marginTop="small">
                <Text bold>{label}</Text>
                {children}
            </Box>
            <Box marginTop="small">
                <Flex alignItems="center">
                    <FlexItem flexGrow={0} paddingRight="small">
                        <Switch
                            checked={checked}
                            disabled={disabled}
                            onChange={onChange}
                        />
                    </FlexItem>
                    <FlexItem flexGrow={1}>
                        {checked ? (
                            <Text>{enabledText}</Text>
                        ) : (
                            <Text color="secondary">{disabledText}</Text>
                        )}
                    </FlexItem>
                </Flex>
            </Box>
        </>
    );
};

export default OverviewPanelToggle;
