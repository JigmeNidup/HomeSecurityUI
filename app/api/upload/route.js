const AIserver = process.env.NEXT_PUBLIC_SERVER;

export const POST = async (req, res) => {
  const data = await req.json();
  try {
    // console.log(data.image);
    let response = await fetch(`${AIserver}/find`, {
      method: "POST",
      body: JSON.stringify({ imgdata: data.image }),
    });
    response = await response.json();
    console.log(response);
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Failed to create new User"), {
      status: 500,
    });
  }
};
