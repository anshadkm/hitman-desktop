import { useCallback } from "react";
import { usePouch } from "use-pouchdb";

export const useAddProject = () => {
  const db = usePouch();

  return useCallback(
    async ({ _id, name }) => {
      let doc = {
        _id: `project_${new Date().toJSON()}`,
        type: "project",
      };

      const existing = await findByName(db, name);
      let result;
      if (_id) {
        // It's an update
        if (existing && existing._id !== _id) {
          return;
        }
        try {
          const _existing = await db.get(_id);
          result = await db.put({ ..._existing, name: name });
        } catch (error) {
          //
        }
      } else if (
        (_id === null || _id === undefined) &&
        existing === undefined
      ) {
        // It's an insert
        result = await db.put({ ...doc, name });
      }
      return result;
    },
    [db],
  );
};

const findByName = async (db, name) => {
  const existing = await db.find({
    selector: { type: "project", name: name },
    fields: ["_id", "_rev", "name"],
  });
  if (existing.docs.length > 0) {
    return existing.docs.find((doc) => doc.name === name);
  }
};
