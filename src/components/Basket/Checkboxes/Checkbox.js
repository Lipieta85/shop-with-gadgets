import React, { useRef } from "react";
import PropTypes from "prop-types";

const Checkbox = ({ type = "checkbox", name, checked, onChange, disabled }) => (
    <input
        type={type}
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
    />
);

Checkbox.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;
