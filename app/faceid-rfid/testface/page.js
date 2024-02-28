"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, message } from "antd";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const server = process.env.NEXT_PUBLIC_SERVER;
const TestFacePage = () => {
  const [loading, setLoading] = useState(false);
  const videoConstraints = {
    width: 325,
    height: 300,
    facingMode: "user",
  };

  const SendServer = async (imgdata) => {
    try {
      let response = await fetch(`${server}/find`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imgdata,
        }),
      });
      response = await response.json();
      console.log(response);
      if (response.status) {
        if (response.result) {
          message.success(response.result.data);
        } else {
          message.error("Image Not Found");
        }
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
    setLoading(true);
    let imageSrc = webcamRef.current.getScreenshot();
    imageSrc = imageSrc.substring(23, String(imageSrc).length);
    let serverStatus = await SendServer(imageSrc);
    // setTimeout(() => {
    // //   console.log();

    //   setLoading(false);
    // }, [3000]);
    setLoading(false);
  }, [webcamRef]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 350 }}>
        <Webcam
          audio={false}
          height={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          videoConstraints={videoConstraints}
        />
        <br />
        <center>
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              capture();
            }}
            size="large"
            icon={<SearchOutlined />}
          >
            Identify Face
          </Button>
        </center>
      </Card>
    </div>
  );
};

export default TestFacePage;
