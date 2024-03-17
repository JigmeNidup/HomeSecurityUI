"use client";
import React, { useEffect, useState } from "react";
import { useDashboardDataStore } from "../layout";
import { Skeleton } from "antd";

const HumidityPage = () => {
  let { client, clientConnected } = useDashboardDataStore();

  let [Data, setData] = useState({
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
            humi: Number(temp.humi).toFixed(2),
          });
          // console.log(temp);
        }
      });
    }
  }, [client]);

  return clientConnected ? (
    <div>
      HumidityPage
      <br />
      <span>{Data.humi}</span>
    </div>
  ) : (
    <Skeleton />
  );
};

export default HumidityPage;
