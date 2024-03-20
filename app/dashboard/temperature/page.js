"use client";
import React, { useEffect, useState } from "react";
import { useDashboardDataStore } from "../layout";
import { Button, Card, Col, Row, Skeleton, Statistic } from "antd";

const TemperaturePage = () => {
  let { client, clientConnected } = useDashboardDataStore();
  const [fan_state, setFanState] = useState(false);

  let [Data, setData] = useState({
    tempC: 0,
    tempF: 0,
    humi: 0,
  });
  useEffect(() => {
    let sub_topic1 = "temp_humi";
    let sub_topic2 = "fan_relay/post";
    if (client) {
      client.on("message", (topic, message) => {
        if (topic == sub_topic1) {
          let temp = message.toString();
          temp = JSON.parse(temp);
          setData({
            tempC: Number(temp.tempC).toFixed(2),
            tempF: Number(temp.tempF).toFixed(2),
            humi: Number(temp.humi).toFixed(2),
          });
        } else if (topic == sub_topic2) {
          if (String(message.toString()) == "true") {
            setFanState(true);
          } else {
            setFanState(false);
          }
        }
      });
    }
  }, [client]);

  // https://www.healthline.com/health/extreme-temperature-safety#extreme-heat-temperatures
  const TemperatureRemark = () => {
    if (Data.tempC < 26) {
      return (
        <Card>
          <Statistic
            title="Remark"
            value="Cold, keep warm"
            valueStyle={{
              color: "#89dee2",
            }}
          />
        </Card>
      );
    } else if (Data.tempC >= 26 && Data.tempC < 32) {
      return (
        <Card>
          <Statistic
            title="Remark"
            value="Normal levels"
            valueStyle={{
              color: "#6dd559",
            }}
          />
        </Card>
      );
    } else if (Data.tempC >= 32 && Data.tempC < 40) {
      return (
        <Card>
          <Statistic
            title="Remark"
            value="Hot, you can experience heat cramps and exhaustion"
            valueStyle={{
              color: "#f5b444",
            }}
          />
        </Card>
      );
    } else if (Data.humi >= 54) {
      return (
        <Card>
          <Statistic
            title="Remark"
            value="Deadly, can lead to heatstroke"
            valueStyle={{
              color: "#ff5b32",
            }}
          />
        </Card>
      );
    }
  };

  return clientConnected ? (
    <div>
      <br />
      <Row justify="start" gutter={[16, 16]}>
        <Col>
          <TemperatureRemark />
        </Col>
        <Col>
          <Card bordered={false}>
            <Statistic title="Temperature" value={Data.tempC} suffix="&deg;C" />
          </Card>
        </Col>
        <Col>
          <Card bordered={false}>
            <Statistic title="Temperature" value={Data.tempF} suffix="&deg;F" />
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 16]} justify="start">
        <Col>
          {fan_state ? (
            <Card>
              <Statistic
                title="Fan State"
                value="ON"
                valueStyle={{
                  color: "#6dd559",
                }}
              />
              <br />
              <Button
                type="primary"
                onClick={() => {
                  setFanState(false);
                }}
              >
                Turn OFF
              </Button>
            </Card>
          ) : (
            <Card>
              <Statistic
                title="Fan State"
                value="OFF"
                valueStyle={{
                  color: "#ff5b32",
                }}
              />
              <br />
              <Button
                type="primary"
                onClick={() => {
                  setFanState(true);
                }}
              >
                Turn ON
              </Button>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  ) : (
    <Skeleton />
  );
};

export default TemperaturePage;
