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
        const fn = new Function(['api', 'request', 'response', 'profile'], script);
        return fn(api, request, response, profile);
    }
    return { tearDown }
}