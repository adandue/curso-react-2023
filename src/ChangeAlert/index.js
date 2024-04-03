import React from "react";
import { withStorageListener } from "./withStorageListener";

const ChangeAlert = ({ show, toggleShow }) => {
    if (show) {
        return <p>Hubo cambios</p>
    }
}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert)

export { ChangeAlertWithStorageListener }