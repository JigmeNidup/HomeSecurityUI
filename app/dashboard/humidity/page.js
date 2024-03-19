"use client";
import React, { useEffect, useState } from "react";
import { useDashboardDataStore } from "../layout";
import { Card, Col, Row, Skeleton, Statistic } from "antd";

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
      <br />
      <br />
      <Row justify="start" gutter={[16, 16]}>
        <Col>
          <Card bordered={false}>
            <Statistic title="Humidity" value={Data.humi} suffix="%" />
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    <Skeleton />
  );
};

export default HumidityPage;
