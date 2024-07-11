import { Tabs } from "antd";
import HttpHeaders from "../../../components/http-headers/HttpHeaders";
import QueryParams from "../../../components/query-params/QueryParams";
import RequestBody from "./RequestBody";
import Toolbar from "../toolbar/Toolbar";
import { useEffect, useState } from "react";
import TearDown from "../teardown-editor/Teardown";

const RequestPane = ({ setResponse, selectedRequest, selectedSidePanel }) => {
  const [url, setUrl] = useState("http://hitman/api");
  const [method, setMethod] = useState("get");
  const [headers, setHeaders] = useState([{ header: "", value: "" }]);
  const [body, setBody] = useState();
  const [contentType, setContentType] = useState();
  const [pathVariables, setPathVariables] = useState([]);
  const [tearDown, setTearDown] = useState();

  useEffect(() => {
    if (selectedRequest) {
        setUrl(selectedRequest.url);
        setMethod(selectedRequest.method);
        setHeaders(selectedRequest.headers);
        //setBody(JSON.stringify(selectedRequest.body));
        setBody(selectedRequest.body);
        setContentType(selectedRequest.contentType);
        setPathVariables(selectedRequest.pathVariables);
        setTearDown(selectedRequest.tearDown);
    }
  }, [selectedRequest]);

  let data = body;
  if (contentType === "Json" && data) {
    try {
      data = body; //JSON.parse(body);
    } catch (e) {
      data = body;
    }
  }

  const requestOptions = [
    {
      label: "Params",
      children: (
        <QueryParams
          url={url}
          setUrl={setUrl}
          pathVariables={pathVariables}
          onPathVariablesChanged={(variables) => setPathVariables(variables)}
        />
      ),
      key: "params",
    },
    {
      label: "Headers",
      children: <HttpHeaders headers={headers} setHeaders={setHeaders} />,
      key: "headers",
    },
    {
      label: "Body",
      children: (
        <RequestBody
          method={method}
          body={data}
          setBody={setBody}
          contentType={contentType}
          setContentType={setContentType}
        />
      ),
      key: "body",
    },
    {
      label: "Setup",
      children: <div>Script editor</div>,
      key: "setup"
    },
    {
      label: "Teardown",
      children: <TearDown tearDown={tearDown} setTearDown={setTearDown} />,
      key: "teardown"
    }
  ];

  return (
    <>
      <Toolbar
        url={url}
        setUrl={setUrl}
        method={method}
        setMethod={setMethod}
        setResponse={setResponse}
        body={data}
        headers={headers}
        contentType={contentType}
        pathVariables={pathVariables}
        tearDown={tearDown}
        selectedSidePanel={selectedSidePanel}
        request={selectedRequest}
      />
      <Tabs items={requestOptions} />
    </>
  );
};

export default RequestPane;
