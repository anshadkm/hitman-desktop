import { useCallback } from "react";
import { usePouch } from "use-pouchdb";

export const useAddHistory = () => {
  const db = usePouch();

  return useCallback(
    async ({ url, method, headers, contentType, pathVariables, tearDown, body }) => {
      const doc = {
        _id: `history_${new Date().toJSON()}`,
        type: "history",
        url,
        method,
        headers,
        contentType,
        pathVariables,
        tearDown,
        body,
      };
      const result = await db.put(doc);
      return result;
    },
    [db],
  );
};
