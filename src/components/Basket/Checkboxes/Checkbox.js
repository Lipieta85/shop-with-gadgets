import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({
    type,
    className,
    id,
    name,
    checked,
    onChange,
    disabled,
}) => (
    <input
        id={id}
        type={type}
        className={className}
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
