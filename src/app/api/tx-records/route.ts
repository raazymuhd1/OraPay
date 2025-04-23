import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"
import { TxRecords } from "@/models/txRecord.model";

// to revalidate the cache data (ISR)
export const revalidate = 60;

let cached = (global as any).mongoose;

if(!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

// db connection
const dbConnect = async() => {
    const dbUrl = `mongodb+srv://muhdraazy:muhdraazy@badger.fuq7k33.mongodb.net/?retryWrites=true&w=majority&appName=badger`

    try {
        if (!cached.promise) {
            cached.promise = mongoose.connect(dbUrl, {
              bufferCommands: false,
            });
          }
        
          cached.conn = await cached.promise;
          console.log("database is connected", cached.conn);
    } catch(err) {
        console.log(err)
    }
}


export async function POST(req: NextRequest, res: NextResponse) {
    const txRecordsData = await req.json();
    let txRecords;

    dbConnect()

    if(txRecordsData) {
        txRecords = new TxRecords({ action: txRecords?.action!, date: txRecords?.date!, value: txRecords?.value! })
        txRecords.save();

        console.log("Data saved")
    }
    
    return Response.json({ msg: "data", data: txRecordsData })
}