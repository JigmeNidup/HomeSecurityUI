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

  const MQ135Remarks = () => {
    if (Data.mq135 < 25) {
      return (
        <Card>
          <Statistic
            title="Remark"
            value="Poor low humidity levels"
            valueStyle={{
              color: "#ff5b32",
            }}
          />
        </Card>
      );
    } else if (Data.mq135 >= 25 && Data.mq135 < 30) {
      return (
        <Card>
          <Statistic
            title="Remark"
            value="Fair humidity levels, keep monitoring"
            valueStyle={{
              color: "#f5b444",
            }}
          />
        </Card>
      );
    } else if (Data.mq135 >= 30 && Data.mq135 < 60) {
      return (
        <Card>
          <Statistic
            title="Remark"
            value="Healthy levels"
            valueStyle={{
              color: "#6dd559",
            }}
          />
        </Card>
      );
    } else if (Data.mq135 >= 60 && Data.mq135 < 70) {
      return (
        <Card>
          <Statistic
            title="Remark"
            value="Fair humidity levels, keep monitoring"
            valueStyle={{
              color: "#f5b444",
            }}
          />
        </Card>
      );
    } else {
      return (
        <Statistic
          title="Remark"
          value="Poor high humidity levels"
          valueStyle={{
            color: "#ff5b32",
          }}
        />
      );
    }
  };


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
