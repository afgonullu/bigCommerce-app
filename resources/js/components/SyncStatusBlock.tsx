import {
    CheckIcon,
    ChevronRightIcon,
    EditIcon,
    ErrorIcon,
    VisibilityIcon,
    WarningIcon,
} from "@bigcommerce/big-design-icons";
import { theme as defaultTheme } from "@bigcommerce/big-design-theme";
import { Box, Flex, FlexItem, H2, H4 } from "@bigcommerce/big-design";
import React from "react";

export interface SyncStatusBlockProps {
    count: number;
    label: string;
    onClick?: () => void;
    variant: "danger" | "primary" | "secondary" | "success" | "warning";
}

const SyncStatusBlock: React.FC<SyncStatusBlockProps> = ({
    count,
    label,
    onClick,
    variant,
}) => {
    const iconProps =
        variant !== "danger"
            ? {
                  color: "white",
                  size: "small",
                  style: {
                      backgroundColor: defaultTheme.colors[variant],
                      borderRadius: defaultTheme.borderRadius.circle,
                      padding: defaultTheme.spacing.xxSmall,
                  },
              }
            : {
                  color: "danger",
                  size: "xLarge",
              };

    const extraBoxProps = onClick
        ? {
              onClick,
              style: {
                  cursor: "pointer",
              },
          }
        : {};

    return (
        <Box
            border="box"
            borderRadius="normal"
            padding="small"
            {...extraBoxProps}
        >
            <Flex>
                <FlexItem flexGrow={0}>
                    {variant === "danger" && <ErrorIcon {...iconProps} />}
                    {variant === "primary" && <EditIcon {...iconProps} />}
                    {variant === "secondary" && (
                        <VisibilityIcon {...iconProps} />
                    )}
                    {variant === "success" && <CheckIcon {...iconProps} />}
                    {variant === "warning" && <WarningIcon {...iconProps} />}
                </FlexItem>
                <FlexItem flexGrow={1}>
                    <H4 marginLeft="small">{label}</H4>
                </FlexItem>
                {onClick && (
                    <FlexItem flexGrow={0}>
                        <ChevronRightIcon />
                    </FlexItem>
                )}
            </Flex>
            <H2 marginLeft="xxLarge" marginBottom="none">
                {count}
            </H2>
        </Box>
    );
};

export default SyncStatusBlock;
