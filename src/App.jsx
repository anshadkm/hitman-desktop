import { App, ConfigProvider, theme } from "antd";
import PouchDb from "pouchdb-browser";
import PouchDbFind from "pouchdb-find";

import Home from "./pages/home/home";

import "./App.css";

PouchDb.plugin(PouchDbFind);

function Application() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <App>
        <Home />
      </App>
    </ConfigProvider>
  );
}

export default Application;
