import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { useAllDocs } from 'use-pouchdb';

export const useExportData = () => {

    const { rows } = useAllDocs({
        include_docs: true,
    });

    const exportData = async () => {
        const myData = JSON.stringify(rows)
        const filePath = await save({ defaultPath: "backup.hm" });
        await writeTextFile(filePath, myData);
    }
    return { exportData }
}