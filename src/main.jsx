import React from "react";
import ReactDOM from "react-dom/client";
import PouchDB from "pouchdb-browser";
import { Provider } from "use-pouchdb";
import App from "./App";

const db = new PouchDB("hitman", {auto_compaction: true});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider pouchdb={db}>
      <App />
    </Provider>
  </React.StrictMode>,
);
