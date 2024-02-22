"use client";
import {
  CheckOutlined,
  FileImageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Popconfirm, Space, Steps, message } from "antd";
import { document } from "postcss";
import React, { useState } from "react";

const NewFace = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [Name, setName] = useState(null);

  const StepContent = () => {
    if (currentStep == 0) {
      return (
        <Card style={{ minHeight: 200, maxWidth: 300 }} hoverable>
          Your Name: {Name}
          <br />
          <br />
          <Input id="name" placeholder="Type Name Here" />
          <br />
          <br />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                let name = window.document.getElementById("name").value;
                setName(name);
                message.success("Your new name is set");
              }}
            >
              Set Your Name
            </Button>
            <Button
              danger
              onClick={() => {
                setName(null);
              }}
            >
              Reset
            </Button>
          </Space>
          <br />
          <br />
          <Popconfirm>
            <Button
              onClick={() => {
                if (!Name) {
                  message.error("Please Set a Name");
                } else {
                  setCurrentStep(1);
                }
              }}
            >
              Next
            </Button>
          </Popconfirm>
        </Card>
      );
    } else if (currentStep == 1) {
      return <Card>Image Upload</Card>;
    } else {
      return <Card>Done</Card>;
    }
  };

  return (
    <div>
      <center>
        <span style={{ fontSize: 22 }}>Enroll New Face</span>
      </center>
      <br />
      <Steps
        size="small"
        current={currentStep}
        items={[
          {
            title: "User Name",
            icon: <UserOutlined />,
          },
          {
            title: "User Image",
            icon: <FileImageOutlined />,
          },
          {
            title: "Done",
            icon: <CheckOutlined />,
          },
        ]}
      />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
        }}
      >
        <StepContent />
      </div>
    </div>
  );
};

export default NewFace;
