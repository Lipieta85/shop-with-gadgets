import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faWarehouse } from "@fortawesome/free-solid-svg-icons";

const checkboxesDelivery = [
    {
        icon: <FontAwesomeIcon icon={faTruck} size="2x" />,
        delivery: "Dostawa kurierem",
        value: "20,00zł",
        name: "check-box-1",
        key: "checkBox1",
        label: "Check Box 1",
    },
    {
        icon: <FontAwesomeIcon icon={faWarehouse} size="2x" />,
        delivery: "Odbiór osobisty",
        value: "0,00zł",
        name: "check-box-2",
        key: "checkBox2",
        label: "Check Box 2",
    },
];

export default checkboxesDelivery;
