import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

const UrlInput = ({ value, onChange }) => {
  const [url, setUrl] = useState("");
  const [isUrlUpdated, propogateUrlUpdate] = useState(false); // If the url is latest, dont post any update

  useEffect(() => {
    if (url !== value && isUrlUpdated) {
      onChange && onChange({ url });
    }
  }, [url]);

  useEffect(() => {
    setUrl(value);
    propogateUrlUpdate(false);
  }, [value]);

  const handleChange = (e) => {
    setUrl(e.target.value);
    propogateUrlUpdate(true);
  };

  return <Input type={"url"} value={url} onChange={handleChange} />;
};

UrlInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default UrlInput;
