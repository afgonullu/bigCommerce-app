import { createAlertsManager } from "@bigcommerce/big-design";
import { useMemo } from "react";

export function useAlertsManager() {
    const alertsManager = useMemo(() => createAlertsManager(), []);

    return alertsManager;
}
