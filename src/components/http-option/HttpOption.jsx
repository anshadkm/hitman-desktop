import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

import "./http-option.scss";

const HttpOption = ({ value, onChange }) => {
  const [option, setOption] = useState();

  useEffect(() => {
    setOption(value);
  }, [value]);

  const handleSelect = (option) => {
    setOption(option);
    onChange(option);
  };

  const options = [
    { value: "get", label: "GET", color: "#6BDD9A" },
    { value: "post", label: "POST", color: "#FFE47E" },
    { value: "put", label: "PUT", color: "#74AEF6" },
    { value: "delete", label: "DELETE", color: "#F79A8E" },
    { value: "patch", label: "PATCH", color: "#C0A8E1" },
    { value: "head", label: "HEAD", color: "#6BDD9A" },
    { value: "options", label: "OPTIONS", color: "#F15EB0" },
  ];

  return (
    <Select
      className={`http-option--${option}`}
      value={option}
      onChange={handleSelect}
      options={options}
      style={{ width: "10rem", color: "red" }}
      optionRender={OptionRender}
    />
  );
};

const OptionRender = ({ label, data }) => {
  return (
    <div
      style={{
        color: data.color,
      }}
    >
      {label}
    </div>
  );
};

OptionRender.propTypes = {
  label: PropTypes.string,
  data: PropTypes.object,
};

HttpOption.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default HttpOption;
