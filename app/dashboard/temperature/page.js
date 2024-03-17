"use client";
import React, { useEffect, useState } from "react";
import { useDashboardDataStore } from "../layout";
import { Skeleton } from "antd";

const TemperaturePage = () => {
  let { client, clientConnected } = useDashboardDataStore();

  let [Data, setData] = useState({
    tempC: 0,
    tempF: 0,
    humi: 0,
  });
  useEffect(() => {
    let sub_topic = "temp_humi";
    if (client) {
      client.on("message", (topic, message) => {
        if (topic == sub_topic) {
          let temp = message.toString();
          temp = JSON.parse(temp);
          setData({
            tempC: Number(temp.tempC).toFixed(2),
            tempF: Number(temp.tempF).toFixed(2),
            humi: Number(temp.humi).toFixed(2),
          });
          // console.log(temp);
        }
      });
    }
  }, [client]);

  return clientConnected ? (
    <div>
      TemperaturePage
      <br />
      <span>{Data.tempC}</span>
    </div>
  ) : (
    <Skeleton />
  );
};

export default TemperaturePage;
