"use client";
import {
  CaretRightOutlined,
  CheckOutlined,
  FileImageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Steps,
  Typography,
  message,
} from "antd";
import React, { useState } from "react";
import ImageUpoad from "./__face_components__/ImageUpoad";
import Link from "next/link";

const { Title } = Typography;

const NewFace = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userId, setUserId] = useState("");
  const [Name, setName] = useState(null);

  const createNewUser = async () => {
    try {
      let response = await fetch("/api/faceid", {
        method: "POST",
        body: JSON.stringify({ name: Name }),
      });
      response = await response.json();
      setUserId(response._id);
      // console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

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
                let name = document.getElementById("name").value;

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
          <Popconfirm
            title="Move to Next Step"
            description="You will not be able to change your name later!"
            onConfirm={() => {
              if (!Name) {
                message.error("Please Set a Name");
              } else {
                createNewUser();
                setCurrentStep(1);
              }
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<CaretRightOutlined />}>
              Next
            </Button>
          </Popconfirm>
        </Card>
      );
    } else if (currentStep == 1) {
      return (
        <div>
          <center>
            <span style={{ fontSize: 16 }}>Take 10 Photo</span>
          </center>
          <br />
          <ImageUpoad
            setCurrentStep={setCurrentStep}
            name={Name}
            userId={userId}
          />
        </div>
      );
    } else {
      return (
        <Card style={{ textAlign: "center", maxWidth: 600 }}>
          <Typography>
            <Title>Congratulations!</Title>
            <Title>You Have Successfully Enrolled Your Face</Title>
          </Typography>
          <br />
          <br />
          <Link href="/faceid-rfid">
            <Button type="primary">Go Back</Button>
          </Link>
        </Card>
      );
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
