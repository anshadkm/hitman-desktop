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
      cleanUp(db);
      return result;
    },
    [db],
  );
};

/**
 * Keep only last 10 requests
 * @param {*} db 
 */
const cleanUp = async (db) => {
  const existing = await db.find({
    selector: { type: "history" },
    fields: ["_id", "_rev"],
    sort: [{"_id": "desc"}]
  });
  for(let i = 10; i < existing.docs.length; i++) {
    db.remove(existing.docs[i]._id, existing.docs[i]._rev);
  }
}