"use client";
import React, { useEffect, useState } from "react";
import { useDashboardDataStore } from "../layout";
import { Card, Col, Row, Skeleton, Statistic } from "antd";

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
      <br />
      <br />
      <Row justify="start" gutter={[16,16]}>
        <Col>
          <Card bordered={false}>
            <Statistic
              title="MQ135 (Air Quality)"
              value={Data.mq135}
              suffix="ppm"
            />
          </Card>
        </Col>
        <Col>
          <Card bordered={false}>
            <Statistic
              title="MQ9 (Flammable Gas)"
              value={Data.mq9}
              suffix="ppm"
            />
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    <Skeleton />
  );
};

export default GasPage;
