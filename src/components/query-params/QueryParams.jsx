import { useEffect, useState } from "react";
import "./query-params.scss";
import PropTypes from "prop-types";
import { Button, Input, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { findPathAndQueryParams } from "../../util/url-util";

const QueryParams = ({
  url,
  setUrl,
  pathVariables: prevPathVariables,
  onPathVariablesChanged,
}) => {
  const [internalUrl, setInternalUrl] = useState("");
  const [queryParams, setQueryParams] = useState([{ key: "", value: "" }]);
  const [pathVariables, setPathVariables] = useState([]);
  const [isUrlUpdated, propogateUrlUpdate] = useState(false);
  const [isPathVariablesUpdated, propogatePathVariables] = useState(false);

  useEffect(() => {
    setInternalUrl(url);
    propogateUrlUpdate(false);
    propogatePathVariables(true);
  }, [url]);

  useEffect(() => {
    setPathVariables(prevPathVariables || [{ key: "", value: "" }]);
    propogatePathVariables(false);
  }, [prevPathVariables]);

  useEffect(() => {
    if (isPathVariablesUpdated) {
      onPathVariablesChanged && onPathVariablesChanged(pathVariables);
    }
  }, [pathVariables]);

  useEffect(() => {
    const {pathVariables: updatedPathVariables, queryParams: updatedQueryParams} = findPathAndQueryParams(internalUrl);
    if (isPathVariablesUpdated) {
      setPathVariables(updatedPathVariables);
    }
    setQueryParams(updatedQueryParams);
  }, [internalUrl]);

  useEffect(() => {
    if (isUrlUpdated) {
      setUrl(internalUrl);
    }
  }, [internalUrl]);

  const handleQueryParamUpdate = (index, key, value) => {
    setQueryParams([
      ...queryParams.slice(0, index),
      { key, value },
      ...queryParams.slice(index + 1),
    ]);
    propogateUrlUpdate(true);
  };

  const handleQueryParamRemove = (index) => {
    const { [index]: removed, ...rest } = queryParams;
    setQueryParams(Object.values(rest));
    propogateUrlUpdate(true);
    return removed;
  };

  const handlePathVariableUpdate = (index, key, value) => {
    setPathVariables([
      ...pathVariables.slice(0, index),
      { key, value },
      ...pathVariables.slice(index + 1),
    ]);
    propogatePathVariables(true);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams();
    queryParams.forEach((param) => {
      searchParams.append(param.key, param.value);
    });
    const updatedUrl = `${
      internalUrl.split("?")[0]
    }?${searchParams.toString()}`;
    if (isUrlUpdated) {
      setInternalUrl(updatedUrl);
    }
  }, [queryParams]);

  return (
    <div className="query-params">
      <div className="query-params__grid">
        {pathVariables?.map((header, index) => (
          <HttpHeader
            key={`pv--${index}`}
            header={header}
            onChange={(_header) =>
              handlePathVariableUpdate(index, _header.key, _header.value)
            }
            isPath={true}
            isRemovable={false}
          />
        ))}
        {queryParams.map((header, index) => (
          <HttpHeader
            key={`qp--${index}`}
            header={header}
            onChange={(_header) =>
              handleQueryParamUpdate(index, _header.key, _header.value)
            }
            onRemove={() => handleQueryParamRemove(index)}
            isRemovable={true}
          />
        ))}
      </div>
    </div>
  );
};

QueryParams.propTypes = {
  url: PropTypes.string,
  pathVariables: PropTypes.array,
  setUrl: PropTypes.func,
  onPathVariablesChanged: PropTypes.func,
};

const HttpHeader = ({ header, onChange, onRemove, isRemovable, isPath }) => {
  const handleHeader = (key, value) => {
    onChange && onChange({ ...header, [key]: value });
  };
  return (
    <Space.Compact style={{ width: "50%" }}>
      <Input
        className={`query-param__header ${
          isPath ? "query-param__path-variable" : ""
        }`}
        type="text"
        placeholder="parameter"
        value={header.key}
        onChange={(e) => handleHeader("key", e.target.value)}
        disabled={isPath}
      />
      <Input
        type="text"
        placeholder="value"
        value={header.value}
        onChange={(e) => handleHeader("value", e.target.value)}
      />
      <Button
        onClick={onRemove}
        disabled={!isRemovable}
        icon={<DeleteOutlined />}
      />
    </Space.Compact>
  );
};

HttpHeader.propTypes = {
  header: PropTypes.object,
  isRemovable: PropTypes.bool,
  isPath: PropTypes.bool,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

export default QueryParams;
