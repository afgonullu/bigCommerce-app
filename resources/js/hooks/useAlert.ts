import { AlertProps } from "@bigcommerce/big-design";
import { useCallback } from "react";
import { useAlertsManager } from "./useAlertsManager";

interface Config {
    header: string;
    body: string;
    type: AlertProps["type"];
}

export function useAlert() {
    const alertsManager = useAlertsManager();
    const getAlert = useCallback(
        (config: Config) => ({
            header: config.header,
            messages: [
                {
                    text: config.body,
                },
            ],
            type: config.type,
            autoDismiss: config.type === "success",
            key: "ajaxFeedback",
        }),
        []
    );

    const add = useCallback(
        (config: Config) => {
            const alert = getAlert(config);

            alertsManager.add(alert);
        },
        [getAlert, alertsManager]
    );

    const remove = useCallback(() => {
        alertsManager.remove("ajaxFeedback");
    }, [alertsManager]);

    return [add, remove];
}
