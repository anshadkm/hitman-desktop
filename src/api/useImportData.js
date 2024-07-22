import { open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from '@tauri-apps/plugin-fs';
import { debug, error } from "@tauri-apps/plugin-log";
import { sendNotification } from '@tauri-apps/plugin-notification'
import { usePouch } from 'use-pouchdb';

export const useImportData = () => {

    const db = usePouch();

    const importData = async () => {

        db.allDocs({include_docs: true}, (error, doc) => {
            if (error) console.error(error);
            else {
                const json = doc.rows.map(({doc}) => doc).filter(({type}) =>  type !== "history")
            } 
          });

        const fname = await open();
        debug("Importing from file {}", fname);
        try {
            const data = await readTextFile(fname.path);
            const json = JSON.parse(data);
            if (json.type === "hm-backup") {
                const response = db.bulkDocs(json.data, {new_edits: false});
            } else {
                throw new Error("Invalid backup file")
            }
        } catch(e) {
            error(`Import failed - ${e}`)
            sendNotification({ title: "Import failed", body: "Invalid file format" });
        }
    }

    return { importData }

}