import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./request.scss";
import { Input, Radio } from "antd";

const RequestBody = ({ body, setBody, contentType, setContentType }) => {
  const options = [
    { value: "Json", label: "Json" },
    { value: "XML", label: "XML" },
    { value: "Text", label: "Text" },
  ];

  const [selectedInput, setSelectedInput] = useState(options[0].value);

  useEffect(() => {
    if (contentType) {
      setSelectedInput(contentType);
    }
  }, [contentType]);

  const handleRequestBody = (e) => {
    setBody(e.target.value);
  };

  const handleOnchange = (event) => {
    setSelectedInput(event?.target?.value);
    setContentType(event?.target?.value);
  };

  return (
    <div className="request">
      <Radio.Group
        options={options}
        optionType="button"
        onChange={handleOnchange}
        value={selectedInput}
      />
      <Input.TextArea
        rows={12}
        showCount={true}
        value={body}
        onChange={handleRequestBody}
      />
    </div>
  );
};

RequestBody.propTypes = {
  body: PropTypes.string,
  setBody: PropTypes.func,
  contentType: PropTypes.string,
  setContentType: PropTypes.func,
};

export default RequestBody;
