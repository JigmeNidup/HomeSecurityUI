"use client";
import {
  AreaChartOutlined,
  CameraOutlined,
  DotChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const { Header, Content, Sider } = Layout;
const Nav = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{}}>
      <Sider
        style={{ minHeight: "100vh", backgroundColor: "white" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          style={{
            minHeight: 55,
            padding: 10,
          }}
        >
          <Image src="/icon/securehome.png" height={40} width={42} alt="logo" />
          {!collapsed && <span>Secure Home</span>}
          <br />
          <hr />
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={[
            {
              key: 1,
              label: <Link href="/faceid-rfid">FACE ID & RFID</Link>,
              icon: <CameraOutlined />,
            },
            {
              key: 2,
              label: <Link href="/temperature">TEMPERATURE</Link>,
              icon: <AreaChartOutlined />,
            },
            {
              key: 3,
              label: <Link href="/humidity">HUMIDITY</Link>,
              icon: <AreaChartOutlined />,
            },
            {
              key: 4,
              label: <Link href="/gas">GAS</Link>,
              icon: <DotChartOutlined />,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: "white",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <div
          style={{
            padding: 24,
          }}
        >
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

export default Nav;
