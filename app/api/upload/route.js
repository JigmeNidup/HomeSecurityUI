import Logs from "@/models/logs";
import Upload from "@/models/uploads";
import fs from "fs";
import moment from "moment";
const AIserver = process.env.NEXT_PUBLIC_SERVER;

export const POST = async (req, res) => {
  const data = await req.json();
  let base64Image = data.imgdata;
  try {
    //debugging
    // let dt = new Date();
    // dt = dt.toISOString();
    // dt = String(dt).substring(0, 19).replace(":", "-").replace(":", "-");
    // let path = `./store/${dt}.png`;
    // console.log(path);
    // fs.writeFileSync(path, base64Image, { encoding: "base64" });

    //save imgdata into db
    const newUpload = new Upload({
      imgdata: base64Image,
      date: moment().format("DD-MM-YYYY"),
      time: moment().format("HH:MM:SS"),
    });

    await newUpload.save();

    let response = await fetch(`${AIserver}/find`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imgdata: base64Image }),
    });
    response = await response.json();
    // let response = { status: true, result: { result: false, data: "bruh" } };
    //log response
    const newLog = new Logs({
      type: "result",
      date: moment().format("DD-MM-YYYY"),
      time: moment().format("HH:MM:SS"),
      message: JSON.stringify(response),
    });
    await newLog.save();

    if (response.status) {
      if (response.result == null) {
        return new Response(JSON.stringify(response), {
          status: 400,
        });
      } else if (response.result.result) {
        return new Response(JSON.stringify(response), {
          status: 200,
        });
      } else {
        return new Response(JSON.stringify(response), {
          status: 400,
        });
      }
    } else {
      return new Response(JSON.stringify(response), {
        status: 400,
      });
    }
  } catch (error) {
    let newLog = new Logs({
      type: "error",
      date: moment().format("DD-MM-YYYY"),
      time: moment().format("HH:MM:SS"),
      message: error.message,
    });
    await newLog.save();
    return new Response(JSON.stringify("Failed to upload image"), {
      status: 500,
    });
  }
};
