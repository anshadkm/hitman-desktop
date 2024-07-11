import { useEffect } from "react";
import PropTypes from "prop-types";
import "./http-headers.scss";
import { Button, Input, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const HttpHeaders = ({ headers, setHeaders }) => {
  useEffect(() => {
    if (!headers || Object.keys(headers).length === 0) {
      setHeaders([{ header: "", value: "" }]);
    }
  }, [headers]);

  const updateHeader = (index, header) => {
    let newHeaders = [...headers];
    newHeaders[index] = header;
    if (index == headers.length - 1) {
      newHeaders.push({ header: "", value: "" });
    }
    setHeaders(newHeaders);
  };

  const removeHeader = (index) => {
    if (headers.length > 1) {
      let newHeaders = [...headers];
      newHeaders.splice(index, 1);
      setHeaders(newHeaders);
    }
  };

  return (
    <div className="http-headers">
      <div className="http-headers__grid">
        {headers &&
          headers.map((header, index) => (
            <HttpHeader
              key={index}
              header={header}
              onChange={(_header) => updateHeader(index, _header)}
              onRemove={() => removeHeader(index)}
              isLast={index === headers.length - 1}
            />
          ))}
      </div>
    </div>
  );
};

const HttpHeader = ({ header, onChange, onRemove, isLast }) => {
  const handleHeader = (key, value) => {
    onChange && onChange({ ...header, [key]: value });
  };
  return (
    <Space.Compact style={{ width: "50%" }}>
      <Input
        type="text"
        placeholder="header"
        value={header.header}
        onChange={(e) => handleHeader("header", e.target.value)}
      />
      <Input
        type="text"
        placeholder="value"
        value={header.value}
        onChange={(e) => handleHeader("value", e.target.value)}
      />
      <Button onClick={onRemove} disabled={isLast} icon={<DeleteOutlined />} />
    </Space.Compact>
  );
};

HttpHeader.propTypes = {
  header: PropTypes.object,
  isLast: PropTypes.bool,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

HttpHeaders.propTypes = {
  headers: PropTypes.array,
  setHeaders: PropTypes.func,
};

export default HttpHeaders;
