import { Select } from "antd";
import { useFind } from "use-pouchdb";
import { useUpdateSettings } from "../../../db/useSettings";

const ProfileList = () => {

  const updateSettings = useUpdateSettings();

  const { docs: profiles } = useFind({
    selector: {
      type: "profile",
    },
  });

  const { docs: settingsDocs } = useFind({
    selector: {
      type: "settings"
    }
  })

  const settings = settingsDocs != null && settingsDocs.length > 0 ? settingsDocs[0] : {};

  const handleSelect = (profile) => {
    if (profile === "add") {
      //setSelectedEnv("none");
    } else {
      updateSettings({...settings, profile});
    }
  };

  return (
    <div className="profile-list">
      <Select
        value={settings?.profile}
        defaultValue="none"
        onChange={handleSelect}
        style={{ minWidth: "15rem" }}
      >
        <Select.Option value={"none"}>Select a profile</Select.Option>
        {profiles.map((profile) => (
          <Select.Option key={profile._id} value={profile._id}>
            {profile.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default ProfileList;
