import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const FaceIDnRFID = () => {
  return (
    <main>
      <section>
        <Link href="/faceid-rfid/newface">
          <Button icon={<PlusOutlined />}>Enroll New Face</Button>
        </Link>
      </section>
      <section></section>
    </main>
  );
};

export default FaceIDnRFID;
