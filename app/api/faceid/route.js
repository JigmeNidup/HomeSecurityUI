import User from "@/models/user";
import { connectToDB } from "@/utils/database/mongodb";

export const POST = async (req, res) => {
  // protected api route

  const { name } = await req.json();
  try {
    await connectToDB();
    const newUser = new User({
      name,
      faceid: false,
      rfid: "",
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Failed to create new User"), {
      status: 500,
    });
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDB();
    let users = await User.find();
    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to Fetch Users"), {
      status: 500,
    });
  }
};
