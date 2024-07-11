import { useAddHistory } from "../db/useHistory";
import { useAddRequest } from "../db/useRequest";
import { invoke } from "@tauri-apps/api/core";
import { updatePathVariables, updateProfileProperties } from "../util/url-util";
import { useDoc, useFind } from "use-pouchdb";
import { updateHeaderWithProfileProperties } from "../util/header-util";
import { updateBodyWithProfileProperties } from "../util/body-util";
import { useTearDownHandler } from "./useTearDownHander";

export const useServerRequest = () => {

  const addHistory = useAddHistory();
  const addRequest = useAddRequest();
  const { tearDown: tearDownHander } = useTearDownHandler();

  const { docs: settingsDocs } = useFind({
    selector: {
      type: "settings"
    }
  });
  const settings = settingsDocs != null && settingsDocs.length > 0 ? settingsDocs[0] : {};
  const { doc: profile } = useDoc(settings?.profile);

  const postRequest = async ({ url, method, contentType, headers, cookies, body }) => {
    //headers = 'Content-Type: application/json';
    const requestPayload = {
      url,
      method,
      headers: headers,
      body: body || null
    };
    return await invoke("send_request", { payload: requestPayload });
  }

  const sendRequest = async ({ id, entityType, method = 'get', url, contentType = 'application/json', headers = [], pathVariables = [], cookies = [], body = {}, tearDown }) => {
    return await handleRemoteRequest({ id, entityType, method, url, headers, contentType, pathVariables, cookies, body, tearDown });
  }

  const addContentType = (type, headers) => {
    let contentType = ['Content-Type', 'application/json']
    if (headers && headers['Content-Type']) {
      // Skip
    } else {
      switch (type) {
        case 'Json':
          contentType = ['Content-Type', 'application/json'];
          break;
        case 'Xml':
          contentType = ['Content-Type', 'application/xml'];
          break;
      }
    }
    return contentType;
  }

  const getHeaders = (_headers, contentType) => {
    _headers = updateHeaderWithProfileProperties(_headers, profile?.properties || []);
    _headers.push(addContentType(contentType));
    return _headers;
  }

  const handleRemoteRequest = async ({ id, entityType, method, url, headers, contentType, pathVariables, cookies, body, tearDown }) => {

    const _headers = headers?.reduce((harr, h) => {
      if (h.header !== "") {
        harr.push([h.header, h.value]);
      }
      return harr;
    }, []);


    try {
      if (entityType == 'request') {
        addRequest({
          method,
          url,
          headers,
          contentType,
          pathVariables,
          body,
          tearDown,
          _id: id,
        });
      }

      let updatedUrl = updateProfileProperties(url, profile?.properties || []);
      updatedUrl = updatePathVariables(updatedUrl, pathVariables);
      updatedUrl = updateProfileProperties(updatedUrl, profile?.properties || []); // to update any path variables which got replaced

      const response = await postRequest({
        url: updatedUrl,
        method,
        headers: getHeaders(_headers, contentType),
        body: body ? updateBodyWithProfileProperties(body, profile?.properties || []) : undefined,
      })

      // Teardown
      tearDownHander({script: tearDown, response});

      if (entityType == 'request') {
        addRequest({
          method,
          url,
          headers,
          contentType,
          pathVariables,
          body,
          tearDown,
          response,
          _id: id,
        });
      }

      if (entityType == 'history') {
        addHistory({
          method,
          url,
          headers,
          contentType,
          pathVariables,
          tearDown,
          response,
          body: body,
        });
      }

      return response;
    } catch (error) {
      throw error;
    }

  };

  return { sendRequest }

}