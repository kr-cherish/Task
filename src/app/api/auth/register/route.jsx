import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import User from "@/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { firstName, lastName, mobile, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, mobile, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
