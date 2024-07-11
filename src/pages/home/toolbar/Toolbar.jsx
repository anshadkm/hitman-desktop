import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HttpOption from "../../../components/http-option/HttpOption";

import "./toolbar.scss";
import { UrlInput } from "../../../components/input";
import { Button, Space } from "antd";
import { useServerRequest } from "../../../api/useServerRequest";

const Toolbar = ({
  url,
  setUrl,
  method,
  setMethod,
  body,
  headers,
  contentType,
  setResponse,
  pathVariables,
  tearDown,
  selectedSidePanel,
  request,
}) => {

  const {sendRequest} = useServerRequest();

  const handleRequest = async () => {
    setResponse({ status: "-", data: undefined });
    try {
      let entityType = '';
      if (selectedSidePanel == 0) {
        entityType = 'request'
      } else if (selectedSidePanel == 1) {
        entityType = 'history'
      }
      const response = await sendRequest({id: request?._id, entityType, method, url, contentType, headers, pathVariables, body, tearDown});
      setResponse(response);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setResponse({
          status: "NO-AGENT",
          data: {error: "Hitman agent service not running."}
        });
      } else {
        setResponse({
          status: error?.response?.status,
          data: error?.response?.data?.data,
        });
      }
    }
  };

  return (
    <Space.Compact
      style={{
        width: "100%",
      }}
    >
      <HttpOption
        className="toolbar__http-method"
        value={method}
        onChange={setMethod}
      />
      <UrlInput
        className="toolbar__url"
        value={url}
        onChange={({ url }) => {
          setUrl(url);
        }}
      />
      <Button className="toolbar__send" onClick={handleRequest} type="primary">
        Send
      </Button>
    </Space.Compact>
  );
};

Toolbar.propTypes = {
  url: PropTypes.string,
  setUrl: PropTypes.func,
  method: PropTypes.string,
  setMethod: PropTypes.func,
  body: PropTypes.object,
  headers: PropTypes.array,
  contentType: PropTypes.string,
  setResponse: PropTypes.func,
  pathVariables: PropTypes.array,
  selectedSidePanel: PropTypes.number,
  request: PropTypes.object,
};

export default Toolbar;
