import { connectDB } from "@/lib/dbConnect";
import User from "@/model/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return new Response(JSON.stringify({ token }), { status: 200 });
    console.log(token);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
