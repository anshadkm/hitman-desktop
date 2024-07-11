import { Button, Card, Dropdown, Input, Space } from "antd";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  MoreOutlined,
  DeleteOutlined,
  FileAddFilled,
} from "@ant-design/icons";
import { useProfile } from "../../../db/useProfile";

const ProfileCard = ({ profile, onClick }) => {
  const [isEdit, setEditMode] = useState(false);
  const [profileName, setProfileName] = useState();
  const addOrUpdateProfile = useProfile();

  useEffect(() => {
    setProfileName(profile.name);
  }, [profile]);

  const profileOptions = [
    { label: "Edit", key: "edit-profile", icon: <EditOutlined /> },
    {
      label: "Delete profile",
      key: "delete-profile",
      icon: <DeleteOutlined />,
      disabled: true,
    },
    { type: "divider" },
    { label: "Add configuration", key: "add-config", icon: <FileAddFilled /> },
  ];

  const switchToEditMode = () => {
    setEditMode(true);
  };

  const save = () => {
    addOrUpdateProfile({ _id: profile._id, name: profileName });
    setEditMode(false);
  };

  const cancel = () => {
    setProfileName(profile.name || "");
    setEditMode(false);
  };

  const handleProfileOptions = ({ key }) => {
    switch (key) {
      case "edit-profile":
        switchToEditMode();
        break;
      case "add-config":
        addNewConfig();
        break;
    }
  };

  return (
    <Card size="small" style={{ margin: "5px" }} onClick={() => onClick(profile)} bordered={false}>
      <div className="profile-card">
        <div className="profile-card__name">
          {!isEdit && <div>{profile.name}</div>}
          {isEdit && (
            <Input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          )}
        </div>
        <div className="profile-card__actions">
          {!isEdit && (
            <>
              <Dropdown
                menu={{
                  items: profileOptions,
                  selectable: false,
                  onClick: handleProfileOptions,
                }}
              >
                <Button size="small" icon={<MoreOutlined />}></Button>
              </Dropdown>
            </>
          )}
          {isEdit && (
            <Space.Compact>
              <Button size="small" onClick={save} icon={<SaveOutlined />} />
              <Button size="small" onClick={cancel} icon={<CloseOutlined />} />
            </Space.Compact>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
