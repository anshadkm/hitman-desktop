import "./home.scss";
import { useState } from "react";
import SideNavbar from "../../components/side-navbar/SideNavbar";
import { Button, Layout, Tabs, theme } from "antd";
import "split-pane-react/esm/themes/default.css";
import ProfileList from "./profile-list/ProfileList";
import HttpRequestPanel from "./http-request-panel/HttpRequestPanel";
import ProfilePanel from "./profile-panel/ProfilePanel";
import { ExportOutlined, ImportOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useExportData } from "../../api/useExportData";
import { useImportData } from "../../api/useImportData";

const Home = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [selectedSidePanel, setSelectedSidePanel] = useState("0");
  const [selectedRequest, setSelectedRequest] = useState();

  const [mainTabs, setMainTabs] = useState([]);
  const [activeKey, setActiveKey] = useState();

  const { exportData } = useExportData();
  const { importData } = useImportData();

  const {
    token: { colorBgContainer, colorBorder, colorBgElevated },
  } = theme.useToken();

  /**
   * When switched between project, history and profiles
   * @param {*} panel 
   */
  const handleSideNavChanged = (panel) => {
    if (panel == selectedSidePanel) {
      setCollapsed(!collapsed);
    } else {
      setSelectedSidePanel(panel);
    }
  };

  /**
   * Called when a tab is closed
   */
  const remove = (targetKey) => {
    const targetIndex = mainTabs.findIndex((pane) => pane.key === targetKey);
    const newPanes = mainTabs.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setMainTabs(newPanes);
    return targetIndex;
  };

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const getTrimmedName = (name) => {
    if (name.length > 30) {
      let firstPart = name.substring(0, 20);
      let lastPart = name.substring(name.length - 10);
      return `${firstPart}...${lastPart}`;
    } else {
      return name;
    }
  }

  /**
   * 
   * @param {*} selectedItem 
   */
  const onSideNavSelectionChanged = (selectedItem) => {
    //setSelectedRequest(request);
    //mainTabs.find(tab => tab.key === request.url)

    let tab = {};
    /* tabs for projects and history */
    if (selectedSidePanel === "0" || selectedSidePanel === "1") {
      tab = {
        label: getTrimmedName(selectedItem.url),
        children: <HttpRequestPanel selectedSidePanel={selectedSidePanel} selectedRequest={selectedItem} />,
        key: selectedSidePanel,
      };
    } else {
      /* tabs for profile selection */
      tab = {
        label: `Profile - ${selectedItem.name}`,
        children: <ProfilePanel profile={selectedItem} />,
        key: selectedSidePanel,
      }
    }
    const tabIndex = mainTabs.findIndex(tab => tab.key === selectedSidePanel);
    if (tabIndex === -1) {
      setMainTabs([...mainTabs, tab])
    } else {
      setMainTabs(mainTabs.toSpliced(tabIndex, 1, tab));
    }
    setActiveKey(selectedSidePanel);
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Layout>
      <Layout.Header
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          background: colorBgContainer,
          height: 50,
          gap: 5
        }}
      >
        <ProfileList />
        <Space.Compact>
          <Button icon={<ExportOutlined />} onClick={() => exportData()}>Export</Button>
          <Button icon={<ImportOutlined />} onClick={() => importData()}>Import</Button>
        </Space.Compact>
      </Layout.Header>
      <Layout style={{ height: "calc(100vh - 80px)" }}>
        <Layout.Sider
          width={500}
          collapsed={collapsed}
          style={{ background: colorBgContainer }}
        >
          <SideNavbar onChange={handleSideNavChanged} onSelectionChanged={onSideNavSelectionChanged} />
        </Layout.Sider>
        <Layout.Content>
          <Tabs items={mainTabs} type="editable-card" hideAdd onEdit={onEdit}
            activeKey={activeKey} onChange={onChange} size="small" indicator={{ size: 5 }} />
        </Layout.Content>
      </Layout>
      <Layout.Footer
        style={{ textAlign: "center", maxHeight: "30px", padding: "5px" }}
      >
        hitman ©2024
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
