import { error } from "@tauri-apps/plugin-log";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification'
import { useDoc, useFind } from "use-pouchdb";
import { useProfile } from "../db/useProfile";

export const useTearDownHandler = () => {

    const { docs: settingsDocs } = useFind({
        selector: {
            type: "settings"
        }
    });
    const settings = settingsDocs != null && settingsDocs.length > 0 ? settingsDocs[0] : {};
    const { doc: profile } = useDoc(settings?.profile);
    const updateProfile = useProfile();

    const setProfileProperty = (name, value) => {
        const newData = [...profile.properties];
        const index = newData.findIndex((item) => name === item.name);
        const item = newData[index];
        newData.splice(index, 1, { ...item, value });
        updateProfile({ _id: profile._id, name: profile.name, properties: newData });
    }

    const api = { setProfileProperty }

    const tearDown = async ({ script, request, response }) => {
        try {
            const fn = new Function(['api', 'request', 'response', 'profile'], script);
            return fn(api, request, response, profile);
        } catch (e) {
            error(`Error while running tear down script, ${e}`);
            let permissionGranted = await isPermissionGranted();
            if (!permissionGranted) {
                const permission = await requestPermission();
                permissionGranted = permission === 'granted';
            }
            sendNotification({ title: "Error in tear down script", body: `${e}`, icon: "Caution" });
        }
    }
    return { tearDown }
}