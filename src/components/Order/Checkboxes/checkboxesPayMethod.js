import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoneyBillWave,
    faCommentDollar,
} from "@fortawesome/free-solid-svg-icons";

const checkboxesDelivery = [
    {
        icon: <FontAwesomeIcon icon={faMoneyBillWave} size="2x" />,
        delivery: "Gotówka",
        value: "0.00zł",
        name: "check-box-3",
        key: "checkBox3",
        label: "Check Box 3",
    },
    {
        icon: <FontAwesomeIcon icon={faCommentDollar} size="2x" />,
        delivery: "Przelew Bankowy",
        value: "0,00zł",
        name: "check-box-4",
        key: "checkBox4",
        label: "Check Box 4",
    },
    {
        icon: <FontAwesomeIcon icon={faCommentDollar} size="2x" />,
        delivery: "Płatność Dotpay",
        value: "29,00zł",
        name: "check-box-4",
        key: "checkBox4",
        label: "Check Box 4",
    },
];

export default checkboxesDelivery;
