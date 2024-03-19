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

  //https://www.airthings.com/what-is-humidity
  const HumidityRemarks = () => {
    if (Data.humi < 25) {
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
    } else if (Data.humi >= 25 && Data.humi < 30) {
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
    } else if (Data.humi >= 30 && Data.humi < 60) {
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
    } else if (Data.humi >= 60 && Data.humi < 70) {
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
      <Row justify="start" gutter={[16, 16]}>
        <Col>
          <HumidityRemarks />
        </Col>
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
