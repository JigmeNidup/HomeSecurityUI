"use client";
import React, { useEffect, useState } from "react";
import { useDashboardDataStore } from "../layout";
import { Skeleton } from "antd";

const GasPage = () => {
  let { client, clientConnected } = useDashboardDataStore();

  let [Data, setData] = useState({
    mq135: 0,
    mq9: 0,
  });
  useEffect(() => {
    let sub_topic = "gas_sensor";
    if (client) {
      client.on("message", (topic, message) => {
        if (topic == sub_topic) {
          let temp = message.toString();
          temp = JSON.parse(temp);
          setData({
            mq135: Number(temp.mq135),
            mq9: Number(temp.mq9),
          });
        }
      });
    }
  }, [client]);

  return clientConnected ? (
    <div>
      GasPage
      <br />
      <br />
      <span>MQ135(Air Quality): {Data.mq135}</span>
      <br />
      <br />
      <span>MQ9(Flammable Gas): {Data.mq9}</span>
    </div>
  ) : (
    <Skeleton />
  );
};

export default GasPage;
