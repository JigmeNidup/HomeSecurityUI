"use client";

import { message } from "antd";
import mqtt from "mqtt";
import React, { createContext, useContext, useEffect, useState } from "react";

const host = process.env.NEXT_PUBLIC_MQTT_BROKER_HOST;
const port = process.env.NEXT_PUBLIC_MQTT_BROKER_PORT;
const user = process.env.NEXT_PUBLIC_MQTT_BROKER_USER;
const password = process.env.NEXT_PUBLIC_MQTT_BROKER_PASSWORD;

const DashboardData = createContext();

export function useDashboardDataStore() {
  return useContext(DashboardData);
}

const DashboardLayout = ({ children }) => {
  const [client, setClient] = useState();

  const [clientConnected, setClientConnected] = useState(false);

  const mqttConnect = ({ HOST, PORT, USERNAME, PASSWORD }) => {
    const host = `wss://${HOST}:${PORT}/mqtt`;
    const clientId = "IoTClient-" + Math.random().toString(16);
    setClient(
      mqtt.connect(host, {
        clientId,
        username: USERNAME,
        password: PASSWORD,
      })
    );
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end();
      setClient(null);
      message.info("Mqtt Disconnected");
      setClientConnected(false);
    }
  };

  const mqttPublish = ({ topic, payload }) => {
    if (client) {
      client.publish(topic, String(payload));
    }
  };

  const mqttSubscribe = ({ topic }) => {
    if (client) {
      client.subscribe(topic);
    }
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        message.success("mqtt connected");

        client.subscribe("temp_humi");
        client.subscribe("gas_sensor");

        setClientConnected(true);
      });
      client.on("error", (error) => {
        console.error(error);
        client.end();
        setClientConnected(false);
      });
      client.on("reconnect", () => {
        console.log("reconnecting....");
      });
      //   client.on("message", (topic, message) => {
      //     console.log(topic, message.toString());
      //   });
    } else {
      mqttConnect({
        HOST: host,
        PORT: port,
        USERNAME: user,
        PASSWORD: password,
      });
    }
  }, [client]);

  return (
    <DashboardData.Provider
      value={{
        client,
        clientConnected,
        // mqttConnect,
        // mqttDisconnect,
        mqttPublish,
        // mqttSubscribe,
      }}
    >
      {children}
    </DashboardData.Provider>
  );
};

export default DashboardLayout;
