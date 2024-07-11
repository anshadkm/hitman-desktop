import { useCallback } from "react";
import { usePouch } from "use-pouchdb";

export const useAddRequest = () => {
  const db = usePouch();

  return useCallback(
    async ({
      _id,
      url,
      method,
      headers,
      contentType,
      pathVariables,
      tearDown,
      body,
      projectId,
      response
    }) => {
      const doc = {
        _id: `request_${new Date().toJSON()}`,
        type: "request",
        url,
        method,
        headers,
        contentType,
        pathVariables,
        tearDown,
        body,
        projectId,
        response
      };
      let result;
      if (_id) {
        try {
          const _existing = await db.get(_id);
          result = await db.put({
            ..._existing,
            ...doc,
            projectId: _existing.projectId,
            _id: _existing._id,
            _rev: _existing._rev,
          });
        } catch (error) {
          //
        }
      } else {
        result = await db.put(doc);
      }
      return result;
    },
    [db],
  );
};
