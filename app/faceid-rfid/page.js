"use client";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Popconfirm, Row, Space, message } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FaceIDnRFID = () => {
  const [users, setUsers] = useState([]);
  const [renderState, setRenderState] = useState(Math.random());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await fetch("/api/faceid", {
          method: "GET",
        });
        response = await response.json();
        setUsers(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (renderState) {
      fetchUsers();
    }
  }, [renderState]);

  const DeleteUser = async (id) => {
    try {
      let response = await fetch(`/api/faceid/${id}`, {
        method: "DELETE",
      });
      response = await response.json();
      if (response) {
        message.success("User Deleted Successful");
        setRenderState(Math.random());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const EditRFID = async (id, rfid) => {
    try {
      let response = await fetch("/api/rfid/", {
        method: "PATCH",
        body: JSON.stringify({ id, rfid }),
      });
      response = await response.json();
      if (response) {
        message.success("User RFID updated Successful");
        setRenderState(Math.random());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const UserCard = ({ val, key }) => {
    const [isEditing, setIsEditing] = useState(false);
    return (
      <Card
        key={key}
        style={{ width: 200, minHeight: 160 }}
        actions={[
          isEditing ? (
            <Popconfirm
              description="Are you sure you want edit this user"
              onConfirm={() => {
                let rfid = document.getElementsByName("rfid")[0].value;
                EditRFID(val._id, rfid);
                setIsEditing(false);
              }}
              onCancel={() => {
                setIsEditing(false);
              }}
            >
              <SaveOutlined />
            </Popconfirm>
          ) : (
            <EditOutlined
              onClick={() => {
                setIsEditing(true);
              }}
            />
          ),
          <Popconfirm
            key={key}
            description="Are you sure you want to delete this user"
            onConfirm={() => {
              DeleteUser(val._id);
            }}
          >
            <DeleteOutlined />
          </Popconfirm>,
        ]}
      >
        <span style={{ fontSize: 18 }}>Name: {val.name}</span>
        <br />
        <br />
        {!isEditing ? (
          <span style={{ fontSize: 18 }}>RFID No: {val.rfid}</span>
        ) : (
          <Input name="rfid" placeholder="New RFID No" />
        )}
      </Card>
    );
  };

  return (
    <main>
      <section>
        <Link href="/faceid-rfid/newface">
          <Button icon={<PlusOutlined />}>Enroll New Face</Button>
        </Link>
      </section>
      <section style={{ paddingTop: 20 }}>
        <Space>
          {users.map((val, i) => {
            return <UserCard key={i} val={val} />;
          })}
        </Space>
      </section>
    </main>
  );
};

export default FaceIDnRFID;
