import User from "@/models/user";
import { connectToDB } from "@/utils/database/mongodb";

//PATCH (update)
export const GET = async (req, res) => {
  try {
    await connectToDB();
    const users = await User.find();
    let obj = {};
    for (let i = 0; i < users.length; i++) {
      obj[users[i].name] = users[i].rfid;
      
    }
    return new Response(JSON.stringify(obj), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Failed to get the User RFID"), {
      status: 500,
    });
  }
};

export const PATCH = async (req, res) => {
  try {
    const { id, rfid } = await req.json();
    await connectToDB();
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return new Response(JSON.stringify("User not found"), { status: 404 });
    }
    existingUser.rfid = rfid;
    await existingUser.save();
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to update the User RFID"), {
      status: 500,
    });
  }
};
