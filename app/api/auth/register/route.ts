// register user through email and password,
// 1. get data from frontend
// 2. validation 
// 3. existing user check
// 4. create user in DB 
// 5. return success message

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
     const {email, password} =   await request.json(); // get data from user

if (!email || !password) {
    return NextResponse.json(
        {error: "Email and Password are required"}, {status: 400})
}

await connectToDatabase()

const existingUser = await User.findOne({email});
if (existingUser) {
    return NextResponse.json({error: "User already registered"}, {status: 400 })
}

const user = await User.create({email, password})
return NextResponse.json(
        {message: "User Registered Successfully", user}, {status: 201})

    } catch (error) {
        console.log("Registeration Error");
        
        return NextResponse.json(
        {error: "Failed to register a user"}, {status: 400})
    }
}