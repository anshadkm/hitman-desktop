import { Pane, SashContent } from "split-pane-react"
import SplitPane from "split-pane-react/esm/SplitPane"
import RequestPane from "../request/RequestPane"
import Response from "../response/Response"
import { useEffect, useState } from "react"
import { theme } from "antd"

const HttpRequestPanel = ({selectedSidePanel, selectedRequest}) => {

    const [response, setResponse] = useState();
    const [sizes, setSizes] = useState(["50%", "auto"]);


  const {
    token: {colorBorder, colorBgElevated },
  } = theme.useToken();

    useEffect(() => {
      setResponse(selectedRequest?.response);
    }, [selectedRequest])

    return (
        
        <SplitPane
            split="horizontal"
            sizes={sizes}
            onChange={setSizes}
            style={{flex: 1,  height: "calc(100vh - 90px - 53px)"}}
            resizerSize={4}
            sashRender={() => (
              <SashContent style={{ backgroundColor: colorBorder }} />
            )}
          >
            <Pane minSize="10%" style={{ padding: "1rem" }}>
              <RequestPane
                setResponse={setResponse}
                selectedRequest={selectedRequest}
                selectedSidePanel={selectedSidePanel}
              />
            </Pane>
            <Pane
              minSize="10%"
              style={{ backgroundColor: colorBgElevated, padding: "1rem" }}
            >
              <Response response={response} />
            </Pane>
          </SplitPane>
    
    )
}

export default HttpRequestPanel;