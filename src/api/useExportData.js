import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { useAllDocs } from 'use-pouchdb';

export const useExportData = () => {

    const { rows } = useAllDocs({
        include_docs: true,
        attachments: true
    });

    const exportData = async () => {
        const json = rows.map(({doc}) => doc).filter(({type}) =>  type !== "history")
        const filePath = await save({ defaultPath: "backup.hm" });
        await writeTextFile(filePath, JSON.stringify({type: "hm-backup", version: "v1", data: json}));
    }
    return { exportData }
}