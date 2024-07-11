import { useCallback } from "react";
import { usePouch } from "use-pouchdb";

export const useProfile = () => {
  const db = usePouch();

  return useCallback(
    async ({ _id, name, properties }) => {
      let doc = {
        _id: `profile_${new Date().toJSON()}`,
        type: "profile",
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
          result = await db.put({ ..._existing, name, properties });
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
    selector: { type: "profile", name: name },
    fields: ["_id", "_rev", "name"],
  });
  if (existing.docs.length > 0) {
    return existing.docs.find((doc) => doc.name === name);
  }
};

/*
123750
 93750
******

138500 / 58  = 2387
===================

1,45,000
  35,000

78

 9 +
70.2
*/
