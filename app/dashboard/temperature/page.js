"use client";
import React, { useEffect, useState } from "react";
import { useDashboardDataStore } from "../layout";
import { Skeleton } from "antd";
// import { Area, Line } from "@ant-design/plots";

const TemperaturePage = () => {
  let { client, clientConnected } = useDashboardDataStore();

  // let [data, setData2] = useState([]);
  // let counter = 0;
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
          // counter += 1;
          // let temp2 = data;
          // temp2.push({ counter, value: Number(Number(temp.tempC).toFixed(2)) });
          // setData2(temp2);
          // console.log(temp);
        }
      });
    }
  }, [client]);

  // const config = {
  //   data,
  //   xField: "counter",
  //   yField: "value",
  // };

  return clientConnected ? (
    <div>
      TemperaturePage
      <br />
      <span>Temperature in Celcius: {Data.tempC}</span>
      <br />
      <br />
      <span>Temperature in Fahrenheit: {Data.tempF}</span>
      {/* <Line {...config} /> */}
    </div>
  ) : (
    <Skeleton />
  );
};

export default TemperaturePage;
