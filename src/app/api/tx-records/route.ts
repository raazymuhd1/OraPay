import { NextRequest } from "next/server";
import mongoose from "mongoose"
import { TxRecords } from "@/models/txRecord.model";

// to revalidate the cache data (ISR)
export const revalidate = 60;


// db connection
const dbConnect = async() => {
    const dbUrl = process.env.DB_URL as string;
    let cached = (global as any).mongoose;
    
    if(!cached) {
        cached = (global as any).mongoose = { conn: null, promise: null };
    }

    try {
        if (!cached.promise) {
            cached.promise = await mongoose.connect(dbUrl, {
              bufferCommands: false,
            });
          }
        
          cached.conn = await cached.promise;
          console.log("database is connected");
    } catch(err) {
        console.log(err)
    }
}

dbConnect()

export async function POST(req: Request) {
    const txRecordsData = await req.json();
    let txRecords;

    console.log(txRecordsData)
    if(txRecordsData) {
        txRecords = await TxRecords.create(txRecordsData)
        console.log("Data saved")
    }
    
    return Response.json({ msg: "data", data: txRecords })
}