import fs from "fs";
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
    let response = await fetch(`${AIserver}/find`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imgdata: base64Image }),
    });
    response = await response.json();
    // let response = "bruh";
    if (response.status) {
      if (response.result.result) {
        return new Response(JSON.stringify(response), {
          status: 200,
        });
      } else {
        return new Response(JSON.stringify(response), {
          status: 400,
        });
      }
    }
    return new Response(JSON.stringify(response), {
      status: 400,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to create new User"), {
      status: 500,
    });
  }
};
