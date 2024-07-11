import { Button, Form, Table } from "antd";
import "./profile-panel.scss";
import React, { useState } from "react";
import EditableRow from "./EditableRow";
import EditableCell from "./EditableCell";
import { useProfile } from "../../../db/useProfile";
import { Space } from "antd";
import { useDoc } from "use-pouchdb";

const ProfilePanel = ({profile: {_id}}) => {

    const { doc: profile } = useDoc(_id);

    const updateProfile = useProfile();

    const defaultColumns = [
        {
            title: "Name",
            editable: true,
            dataIndex: 'name'
        },
        {
            title: "Value",
            editable: true,
            dataIndex: 'value'
        }
    ]

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    }

    const handleSave = (row) => {
        const newData = [...profile.properties];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        //setDataSource(newData);
        updateProfile({_id: profile._id, name: profile.name, properties: newData});
    };

    const handleAdd = () => {
        if (!profile.properties) {
            profile.properties = []
        }
        updateProfile({_id: profile._id, name: profile.name, properties: [...profile.properties, {key: new Date().toJSON(), name: "new property", value: "value"}]});
    }

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
      });
    
    if (profile === null) {
        return;
    }
    return (<div className="profile-panel">
        <div>Properties</div>
        <Button onClick={handleAdd}>Add</Button>
        <Space/>
        <Table columns={columns} dataSource={profile.properties} components={components}/>
    </div>)
}

export default ProfilePanel;