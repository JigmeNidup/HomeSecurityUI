"use client";
import { SendOutlined } from "@ant-design/icons";
import { Button, Card, Progress, Space, message } from "antd";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const maxImageCount = 10;
const server = process.env.NEXT_PUBLIC_SERVER;

const ImageUpoad = ({ setCurrentStep, name, userId }) => {
  let [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const videoConstraints = {
    width: 325,
    height: 300,
    facingMode: "user",
  };

  const updateNewUser = async () => {
    try {
      let response = await fetch(`/api/faceid/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ faceid: "true" }),
      });
      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const SendServer = async (imgdata, count) => {
    try {
      let response = await fetch(`${server}/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imgdata,
          username: name,
          filename: "saveimg.jpg",
          count,
        }),
      });
      response = await response.json();
      console.log(response);
      if (response.status) {
        message.success("Image Uploaded Successful");
        return true;
      } else {
        message.error("Image Not Uploaded");
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    if (count != maxImageCount) {
      setLoading(true);
      let imageSrc = webcamRef.current.getScreenshot();
      imageSrc = imageSrc.substring(23, String(imageSrc).length);
      let serverStatus = await SendServer(imageSrc, count);
      if (serverStatus) {
        setLoading(false);
        let c = count + 1;
        setCount(c);
      } else {
        setLoading(false);
      }
    } else if (count == maxImageCount) {
      message.info("Maximum photo taken");
    }
  }, [webcamRef, count]);

  const NextButton = () => {
    if (count == maxImageCount) {
      return (
        <Button
          type="primary"
          onClick={() => {
            updateNewUser();
            setCurrentStep(2);
          }}
        >
          Next Step
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Card>
        <span style={{ fontSize: 18 }}>Name: {name}</span>
        <br />
        <Webcam
          audio={false}
          height={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={325}
          videoConstraints={videoConstraints}
        />
        <br />
        <Space>
          <Button
            loading={loading}
            type="primary"
            iccon={<SendOutlined />}
            onClick={() => {
              capture();
            }}
          >
            Capture photo {count}/{maxImageCount}
          </Button>
          <Progress
            type="circle"
            size="small"
            percent={(count / maxImageCount) * 100}
          />
        </Space>
        <br />
        <br />
        <NextButton />
      </Card>
    </div>
  );
};

export default ImageUpoad;
