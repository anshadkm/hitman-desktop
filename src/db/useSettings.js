import { useCallback } from "react";
import { usePouch } from "use-pouchdb";

const ENTITY = "settings";

export const useUpdateSettings = () => {
  const db = usePouch();

  return useCallback(
    async (settings) => {
      let doc = {
        _id: `${ENTITY}_${new Date().toJSON()}`,
        type: ENTITY,
        ...settings
      };

      if (settings._id) {
        try {
          const _existing = await db.get(settings._id);
          result = await db.put({
            ..._existing,
            ...doc,
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