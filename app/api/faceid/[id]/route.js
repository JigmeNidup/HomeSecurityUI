import User from "@/models/user";
import { connectToDB } from "@/utils/database/mongodb";

//PATCH (update)
export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const existingUser = await User.findById(params.id);
    if (!existingUser) {
      return new Response(JSON.stringify("User not found"), { status: 404 });
    }
    existingUser.faceid = true;
    await existingUser.save();
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to update the User"), {
      status: 500,
    });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await User.findByIdAndDelete(params.id);
    return new Response(JSON.stringify("User Deleted Successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Failed to delete the User"), {
      status: 500,
    });
  }
};
